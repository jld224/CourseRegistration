import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Typography, Spin } from 'antd';
import CustomLayout from '../../components/Layout';
import nookies from 'nookies';

const { Title, Paragraph } = Typography;

const FacultyBasePage = ({ facultyId }) => {
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    // Fetch faculty info directly using the facultyId from props
    if (facultyId) {
      fetch(`/api/faculty/${facultyId}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error(data.error)
          } else {
            setFaculty(Array.isArray(data) && data.length ? data[0] : data);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [facultyId]);

  return (
    <div>
      <div className="hero" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <Title className="hero-title">Welcome Faculty, to our Course Registration System</Title>
        <Paragraph className="hero-description">Join us and expand your knowledge.</Paragraph>
        <Link href="/courses">
          <Button type="primary">Browse Courses</Button>
        </Link>
      </div>

      <div className="content" style={{ background: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
        {faculty ? (
          <>
            <Title level={2}>Faculty Information</Title>
            <Paragraph>Name: {faculty.name}</Paragraph>
            <Paragraph>Email: {faculty.email}</Paragraph>
            {}
          </>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get cookies from context
  const cookies = nookies.get(context);
  // Extract facultyId from cookies, or redirect to login if not found
  const facultyId = cookies.facultyId; // This cookie should be set during faculty login

  if (!facultyId) {
    // Redirect to login if facultyId is not found
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { facultyId } };
}

export default FacultyBasePage;