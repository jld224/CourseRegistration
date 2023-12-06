import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Button, Card, Spin, Row, Col, Divider } from 'antd';
import StudentLayout from '../../components/StudentLayout';
import nookies from 'nookies';

const { Title, Paragraph } = Typography;

const StudentBasePage = () => { // Use studentId from props
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      const response = await fetch(`/api/studentProfile?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch profile');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>No profile data.</div>;
  }

  return (
    <>
      <Row justify="center" align="middle" className="hero">
        <Col>
          <Title level={1} className="hero-title">Welcome {profile.studentName}, to our Course Registration System</Title>
          <Paragraph className="hero-description">Join us and expand your knowledge.</Paragraph>
          <Link href="/coursesStudent">
            <Button type="primary" size="large">Browse Courses</Button>
          </Link>
        </Col>
      </Row>

      <Row justify="center" className="content">
        <Col span={24} md={16} lg={12}>
          {profile ? (
            <Card bordered={false} className="profile-card">
              <Title level={2}>{profile.studentName}</Title>
              <Divider />
              <Paragraph><strong>Program:</strong> {profile.studentProgram}</Paragraph>
              <Paragraph><strong>Currently Enrolled In:</strong> {Array.isArray(profile.coursesTaking) ? profile.coursesTaking.join(', ') : ''}</Paragraph>
              <Paragraph><strong>Courses Passed:</strong> {Array.isArray(profile.coursesPassed) ? profile.coursesPassed.join(', ') : ''}</Paragraph>
              <Paragraph><strong>Waitlist Courses:</strong> {Array.isArray(profile.coursesWaiting) ? profile.coursesWaiting.join(', ') : ''}</Paragraph>
              <Paragraph><strong>ID:</strong> {profile.userID}</Paragraph>
            </Card>
          ) : (
            <Spin size="large" />
          )}
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps(context) {
  // Get cookies from context
  const cookies = nookies.get(context);
  // Extract studentId from cookies, or redirect to login if not found
  const studentId = cookies.studentId;

  if (!studentId) {
    // Redirect to login if studentId is not found
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { studentId } };
}

StudentBasePage.Layout = StudentLayout;

export default StudentBasePage;