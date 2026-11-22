
import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const { Title, Text } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await login(values);
      message.success('Login successful');
      navigate('/');
    } catch (error) {
      message.error(
        error.response?.data?.message || 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
      padding: 20
    }}>
      <Card style={{ width: 400, maxWidth: '100%', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={2}>HAUPCAR</Title>
          <Text type="secondary">Car Management System</Text>
        </div>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter password"
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
