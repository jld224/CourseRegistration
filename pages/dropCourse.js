import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, message } from 'antd';
import StudentLayout from '../components/StudentLayout';

DropCourse.Layout = StudentLayout;

export default function DropCourse() {
  const [userID, setUserID] = useState('');
  const [courseID, setCourseID] = useState('');

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

    const response = await fetch('/api/dropCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID, courseID }),
    });

    if (response.status === 200) {
      message.success('Course dropped successfully');
      // Optionally, you may want to reset the form or perform additional actions
    } else {
      message.error('An error occurred dropping course');
    }
  };

  return (
    <div>
      <h1>Drop Course from Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="User ID" name="userID" rules={[{ required: true, message: 'Please input user ID' }]}>
          <Input placeholder="User ID" value={userID} onChange={handleUserIDChange} />
        </Form.Item>
        <Form.Item label="Select Course ID" name="courseID" rules={[{ required: true, message: 'Please select a course' }]}>
          <Input placeholder="Course ID" value={courseID} onChange={handleCourseIDChange}>
            </Input>
        </Form.Item>
        <Button type="primary" htmlType="submit">Drop Course!</Button>
      </Form>
    </div>
  );
}