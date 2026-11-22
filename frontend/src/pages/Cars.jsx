
import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Space,
  Popconfirm,
  Typography,
  message,
  Card,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import api from '../services/api';

const { Title } = Typography;

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form] = Form.useForm();

 
const fetchCars = async () => {
  try {
    setLoading(true);
    const response = await api.get('/cars');
    setCars(response.data.data || []);
  } catch (error) {
    message.error(error.response?.data?.message || 'Failed to load cars');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  let active = true;

  const loadCars = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cars');

      if (active) {
        setCars(response.data.data || []);
      }
    } catch (error) {
      if (active) {
        message.error(error.response?.data?.message || 'Failed to load cars');
      }
    } finally {
      if (active) {
        setLoading(false);
      }
    }
  };

  loadCars();

  return () => {
    active = false;
  };
}, []);


  useEffect(() => {
  let active = true;

  const loadCars = async () => {
    try {
      const response = await api.get('/cars');

      if (active) {
        setCars(response.data.data || []);
      }
    } catch (error) {
      if (active) {
        message.error(
          error.response?.data?.message || 'Failed to load cars'
        );
      }
    }
  };

  loadCars();

  return () => {
    active = false;
  };
}, []);

  const openModal = (car = null) => {
    setEditingCar(car);
    form.setFieldsValue(car || {
      registrationNumber: '',
      brand: '',
      model: '',
      notes: '',
    });
    setOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingCar) {
        await api.put(`/cars/${editingCar._id}`, values);
        message.success('Car updated successfully');
      } else {
        await api.post('/cars', values);
        message.success('Car added successfully');
      }

      setOpen(false);
      form.resetFields();
      fetchCars();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cars/${id}`);
      message.success('Car deleted successfully');
      fetchCars();
    } catch (error) {
      message.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const filteredCars = cars.filter((car) =>
    [
      car.registrationNumber,
      car.brand,
      car.model,
    ].some((value) =>
      value?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Registration Number',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (value) => value || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this car?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record._id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
      }}>
        <Title level={3} style={{ margin: 0 }}>
          Car Management
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Add New Car
        </Button>
      </div>

      <Input
        placeholder="Search registration, brand or model"
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 350, marginBottom: 20 }}
        allowClear
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredCars}
        loading={loading}
        scroll={{ x: 700 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingCar ? 'Edit Car' : 'Add New Car'}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Save"
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Registration Number"
            name="registrationNumber"
            rules={[{ required: true, message: 'Please enter registration number' }]}
          >
            <Input placeholder="e.g. กข-9999" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: 'Please enter brand' }]}
          >
            <Input placeholder="e.g. Toyota" />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please enter model' }]}
          >
            <Input placeholder="e.g. Camry" />
          </Form.Item>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={3} placeholder="Additional details..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Cars;
