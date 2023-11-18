import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
const { Content } = Layout;

const LoginLayout = ({ children }) => {
  return (
    <Layout className="login-layout">
      <Content style={{ minHeight: '100vh' }}>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={20} sm={16} md={12} lg={8} xl={6}>
            <Card>
              {/* This is where the login form would be rendered */}
              {children}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginLayout;