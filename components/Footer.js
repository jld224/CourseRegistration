import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Your footer content goes here.
    </Footer>
  );
};

export default CustomFooter;