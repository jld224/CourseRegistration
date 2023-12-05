import React, { useState, useEffect } from 'react';
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

// Modified layout to handle user type
const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  
  // State for user type and ID
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user type from local storage at start and set state
    const storedUserType = localStorage.getItem('userType');
    const storedUserId = localStorage.getItem('userId');
    setUserType(storedUserType);
    setUserId(storedUserId);
  }, []);

  // Modify the home route based on the user type
  const getHomeRoute = () => {
    return `/faculty/facultyBasePage?id=${userId}`;
  };

  const menuItems = [
    {
      key: getHomeRoute(),
      icon: <UserOutlined />,
      label: 'Home',
    },
    {
      key: '/facultyProfile',
      icon: <SyncOutlined />,
      label: 'Faculty Profile',
    },
    {
      key: '/coursesFaculty',
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
        <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]}>
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
              <Link href="/logout">
                <Button type="default">
                  Logout
                </Button>
              </Link>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
          }}
        >
          {children}
        </Content>
        <CustomFooter />
      </Layout>
      </Layout>
  );
};

export default AppLayout;