import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Typography, Spin } from 'antd';
import StudentLayout from '../components/StudentLayout';
import nookies from 'nookies';

const { Title, Paragraph } = Typography;

const StudentBasePage = ({ studentId }) => { // Use studentId from props
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student info directly using the studentId from props
    fetch(`/api/students/${studentId}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          setStudent(Array.isArray(data) && data.length ? data[0] : data);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [studentId]);

  return (
    <>
      <div className="hero" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <Title className="hero-title">Welcome Students, to our Course Registration System</Title>
        <Paragraph className="hero-description">Join us and expand your knowledge.</Paragraph>
        <Link href="/courses">
          <Button type="primary">Browse Courses</Button>
        </Link>
      </div>

      <div className="content" style={{ background: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
        {student ? (
          <>
            <Title level={2}>{student.studentName}</Title>
            <Paragraph>Program: {student.studentProgram}</Paragraph>
            <Paragraph>Courses Passed: {JSON.parse(student.coursesPassed || '[]').join(', ')}</Paragraph>
            <Paragraph>Courses Taking: {JSON.parse(student.coursesTaking || '[]').join(', ')}</Paragraph>
            <Paragraph>Courses Waiting: {JSON.parse(student.coursesWaiting || '[]').join(', ')}</Paragraph>
            <Paragraph>ID: {student.userID}</Paragraph>
            <Paragraph>name: {student.studentName}</Paragraph>
          </>
        ) : (
          <Spin size="large" />
        )}
      </div>
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