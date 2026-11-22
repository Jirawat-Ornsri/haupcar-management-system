
import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Typography, message } from 'antd';
import { CarOutlined, AppstoreOutlined } from '@ant-design/icons';
import api from '../services/api';

const { Title } = Typography;

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cars');
        setCars(response.data.data || []);
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const brandCount = new Set(cars.map((car) => car.brand)).size;

  const columns = [
    { title: 'Registration', dataIndex: 'registrationNumber', key: 'registrationNumber' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
  ];

  return (
    <div>
      <Title level={3}>Dashboard</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Total Cars"
              value={cars.length}
              prefix={<CarOutlined />}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Total Brands"
              value={brandCount}
              prefix={<AppstoreOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Cars">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={cars.slice(0, 5)}
          loading={loading}
          pagination={false}
          scroll={{ x: 500 }}
        />
      </Card>
    </div>
  );
}

export default Dashboard;
