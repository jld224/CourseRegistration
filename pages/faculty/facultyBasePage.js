import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Spin, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;

const FacultyBasePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/facultyProfile?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isLoading) {
    return <Spin tip="Loading profile..." />;
  }

  if (!profile) {
    return <div>No profile data.</div>;
  }

  return (
    <div className="faculty-container">
      <Row justify="center" align="middle" className="hero">
        <Col>
          <Title>Welcome {profile.facultyName}, to our Course Registration System</Title>
          <Paragraph>Join us and expand your knowledge.</Paragraph>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={24} md={16} lg={12}>
          <Card
            bordered={false}
            style={{ marginTop: '32px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            <Title level={2}>Faculty Information</Title>
            <Paragraph>
              <strong>Name:</strong> {profile.facultyName}
            </Paragraph>
            <Paragraph>
              <strong>Title:</strong> {profile.facultyTitle}
            </Paragraph>
            <Paragraph>
              <strong>Department:</strong> {profile.facultyDepartment}
            </Paragraph>
            <Paragraph>
              <strong>Courses:</strong>{' '}
              {profile.facultyCoursesTeaching.join(', ')}
            </Paragraph>
            <Paragraph>
              <strong>ID:</strong> {profile.userID}
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FacultyBasePage;