import React from 'react';
import { Layout } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5', padding: '24px 50px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>University Course Registration System ©{new Date().getFullYear()}</p>
        <p style={{ margin: 0 }}>
          <PhoneOutlined /> (123) 456-7890 | <MailOutlined /> registrar@university.edu
        </p>
      </div>
    </Footer>
  );
};

export default CustomFooter;