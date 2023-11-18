import React from 'react';
import Link from 'next/link';
import { Button, Typography } from 'antd'; // Import Ant Design components
import CustomLayout from '../components/Layout';

const { Title, Paragraph } = Typography;

const BasePage = () => (
  <div>
    <div className="hero" style={{ textAlign: 'center', paddingTop: '100px' }}>
      <Title className="hero-title">Welcome to our Course Registration System</Title>
      <Paragraph className="hero-description">Join us and expand your knowledge.</Paragraph>
      <Link href="/courses">
        <Button type="primary">Browse Courses</Button>
      </Link>
    </div>

    <div className="content" style={{ background: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
      <Title level={2}>About Us</Title>
      <Paragraph>
        We provide a platform that connects students and teachers to make learning easier and efficient.
      </Paragraph>
    </div>

  </div>
);

export default BasePage;