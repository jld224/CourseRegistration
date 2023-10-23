import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ClearOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import CustomFooter from './Footer';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      key: '/',
      icon: <UserOutlined />,
      label: 'Home',
    },
    {
      key: '/courses',
      icon: <UnorderedListOutlined />,
      label: 'Courses',
    },
    {
      key: '/addCourse',
      icon: <UploadOutlined />,
      label: 'Add Courses',
    },
    {
      key: '/removeCourse',
      icon: <ClearOutlined />,
      label: 'Remove Courses',
    },
    {
      key: '/update',
      icon: <SyncOutlined />,
      label: 'Update Courses',
    },
  ];

  const { pathname } = router;
  const activeMenu = pathname;

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={[activeMenu]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link href={item.key}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: collapsed ? 'transparent' : '#fff',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: collapsed ? '16px' : '18px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
};

export default App;