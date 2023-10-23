import React, { useState } from 'react';
import { Input, Button, Form, message} from 'antd';

export default function RemoveCourse() {
  const [courseName, setCourseName] = useState('');

  const handleChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(courseName === ''){
        message.error('Please input a course name');
        return;
    }

    const response = await fetch('/api/removeCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseName })
    });

    if(response.status === 200)
        message.success("Course removed successfully")
    else
        message.error("An error occurred removing course")
  };

  return (
    <div>
      <h1>Remove Course</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Course Name" name="courseName" rules={[{required: true, message: 'Please input course name'}]}>
          <Input placeholder="Course Name" onChange={handleChange} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>Remove Course</Button>
      </Form>
    </div>
  );
}