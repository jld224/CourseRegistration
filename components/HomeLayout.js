// HomeLayout.js
import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import Link from 'next/link'; // Make sure to import Link from 'next/link'
import CustomFooter from './Footer';


const { Header, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout className="login-layout">
      <Header style={{ background: '#fff', padding: '0 50px', boxShadow: '0 2px 8px #f0f1f2' }}>
        <Row justify="end" align="middle" style={{ height: '100%' }}>
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
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          {children}
        </div>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

export default HomeLayout;
