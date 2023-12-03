import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, message } from 'antd';

export default function JoinCourse() {
  const [userID, setUserID] = useState('');
  const [courseID, setCourseID] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/courses');
      const courses = await res.json();
      setCourses(courses);
    };

    fetchData();
  }, []);

  const handleUserIDChange = (e) => {
    setUserID(e.target.value);
  };

  const handleCourseIDChange = (value) => {
    setCourseID(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userID === '' || courseID === '') {
      message.error('Please input both userID and courseID');
      return;
    }

    const response = await fetch('/api/joinCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID, courseID }),
    });

    if (response.status === 200) message.success('Course added successfully');
    else message.error('An error occurred adding course');
  };

  return (
    <div>
      <h1>Add Course to Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="User ID" name="userID" rules={[{ required: true, message: 'Please input user ID' }]}>
          <Input placeholder="User ID" onChange={handleUserIDChange} />
        </Form.Item>
        <Form.Item label="Select Course ID" name="courseID" rules={[{ required: true, message: 'Please select a course' }]}>
          <Select placeholder="Select a course" onChange={handleCourseIDChange}>
            {/* Map through courses and return Select.Option for each */}
            {courses.map((course) => (
              <Select.Option key={course.courseID} value={course.courseID}>
                {`${course.courseID} - ${course.courseName}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>Add Course!</Button>
      </Form>
    </div>
  );
}