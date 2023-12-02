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
import { Layout, Menu, Button, theme, Row, Col } from 'antd';
import CustomFooter from './Footer';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

const StudentLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
        key: '/student/studentBasePage',
        icon: <UserOutlined />,
        label: 'Home',
    },
    {
      key: '/courseRegister',
      icon: <SyncOutlined />,
      label: 'Course Register',
    },
    {
      key: '/student/${studentId}',
      icon: <SyncOutlined />,
      label: 'Profile',
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
            padding: '0 16px',
            background: collapsed ? 'transparent' : '#fff',
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
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
            </Col>
            <Col>
              <Link href="/register">
                <Button type="default" style={{ marginRight: '15px' }}>
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button type="default">
                  Login
                </Button>
              </Link>
            </Col>
          </Row>
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

export default StudentLayout;