import React, { useState } from 'react';
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <div className="main-content"></div>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: (
                <span>
                  <a href="/index">Home</a>
                </span>
              ),
            },
            {
              key: '2',
              icon: <UnorderedListOutlined />,
              label: (
                <span>
                  <a href="/courses">Courses</a>
                </span>
              ),
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: (
                <span>
                  <a href="/addCourse">Add Courses</a>
                </span>
              ),
            },
            {
              key: '4',
              icon: <ClearOutlined />,
              label: (
                <span>
                  <a href="/removeCourse">Remove Courses</a>
                </span>
              ),
            },
            {
              key: '5',
              icon: <SyncOutlined />,
              label: (
                <span>
                  <a href="/update">Update Courses</a>
                </span>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
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