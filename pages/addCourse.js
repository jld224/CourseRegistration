import { useState } from 'react';
import { Form, Input, Button, InputNumber, TimePicker, Select } from 'antd';
import moment from 'moment';

export default function AddCourse() {
  const [form] = Form.useForm();
  const [courseData, setCourseData] = useState({
    courseID: '',
    courseName: '',
    courseSubjectID: '',
    courseTerm: '',
    courseStartTime: '',
    courseEndTime: '',
    courseDaysOfWeek: '',
    courseRoom: '',
    courseLocation: '',
    courseCredits: '',
    courseCareer: '',
    courseInstructor: '',
    prerequisites: '',
    corequisites: '',
    courseSeats: '',
    courseStudents: '',
    courseWaitList: ''
  });

  const handleChange = (name, value) => {
    setCourseData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API route to insert the data
    const response = await fetch('/api/insertCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });

    // Handle the response here (e.g., show success or error message)
  };

  return (
    <div>
      <h1>Add New Course</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Course ID" name="courseID" rules={[{ required: true }]}>
          <Input onChange={(e) => handleChange('courseID', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Name" name="courseName" rules={[{ required: true }]}>
          <Input onChange={(e) => handleChange('courseName', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Subject ID" name="courseSubjectID">
          <Input onChange={(e) => handleChange('courseSubjectID', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Term" name="courseTerm" rules={[{ required: true }]}>
          <Input onChange={(e) => handleChange('courseTerm', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Start Time" name="courseStartTime" rules={[{ required: true }]}>
          <TimePicker format='HH:mm' onChange={(time, timeString) => handleChange('courseStartTime', timeString)} />
        </Form.Item>
        <Form.Item label="Course End Time" name="courseEndTime" rules={[{ required: true }]}>
          <TimePicker format='HH:mm' onChange={(time, timeString) => handleChange('courseEndTime', timeString)} />
        </Form.Item>
        <Form.Item label="Course Days Of Week" name="courseDaysOfWeek">
          <Input onChange={(e) => handleChange('courseDaysOfWeek', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Room" name="courseRoom" rules={[{ required: true }]}>
          <Input onChange={(e) => handleChange('courseRoom', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Location" name="courseLocation">
          <Input onChange={(e) => handleChange('courseLocation', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Instructor" name="courseInstructor">
          <Input onChange={(e) => handleChange('courseInstructor', e.target.value)} />
        </Form.Item>
        <Form.Item label="Prerequisites" name="prerequisites">
          <Input onChange={(e) => handleChange('prerequisites', e.target.value)} />
        </Form.Item>
        <Form.Item label="Corequisites" name="corequisites">
          <Input onChange={(e) => handleChange('corequisites', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Seats" name="courseSeats" rules={[{ required: true }]}>
          <InputNumber min={0} onChange={(value) => handleChange('courseSeats', value)} />
        </Form.Item>
        <Form.Item label="Course Students" name="courseStudents">
          <Input onChange={(e) => handleChange('courseStudents', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Wait List" name="courseWaitList">
          <Input onChange={(e) => handleChange('courseWaitList', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Credits" name="courseCredits" rules={[{ required: true }]}>
          <InputNumber min={0} onChange={(value) => handleChange('courseCredits', value)} />
        </Form.Item>
        <Form.Item label="Course Career" name="career" rules={[{ required: true }]}>
          <Select onChange={(value) => handleChange('courseCareer', value)}>
            {/* Options for the Select */}
            <Select.Option value="Undergraduate">Undergraduate</Select.Option>
            <Select.Option value="Postgraduate">Postgraduate</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Course</Button>
        </Form.Item>
      </Form>
    </div>
  );
}