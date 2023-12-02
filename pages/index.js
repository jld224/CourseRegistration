import React from 'react';
import Link from 'next/link';
import { Button, Typography } from 'antd';
import HomeLayout from '../components/HomeLayout';

const { Title, Paragraph } = Typography;

const HomePage = () => (
  <div>
    <div className="hero" style={{ textAlign: 'center', paddingTop: '100px' }}>
      <Title className="hero-title">Welcome to our Course Registration System</Title>
      <Paragraph className="hero-description">Join us and expand your knowledge.</Paragraph>
      <Link href="/courses">
        <Button type="primary" style={{size:"large"}}>Browse Courses</Button>
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

HomePage.Layout = HomeLayout;

export default HomePage;
