
import { Layout, Menu, Button, Typography } from 'antd';
import {
  CarOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 24, color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          HAUPCAR
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/'),
            },
            {
              key: '/cars',
              icon: <CarOutlined />,
              label: 'Car Management',
              onClick: () => navigate('/cars'),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
        }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Car Management System
          </Typography.Title>

          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>

        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
