import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, message, TimePicker, InputNumber } from 'antd';
import fetch from 'isomorphic-unfetch';

export default function UpdateCourse() {
  const [courseData, setCourseData] = useState({ courseID: '', newCourseName: '' });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/courses');
      const courses = await res.json();
      setCourses(courses);
    };

    fetchData();
  }, []);

  const handleChange = (value, option) => {
    setCourseData({ ...courseData, courseID: value, newCourseName: option.children });
  };

  const handleNewCourseNameChange = (e) => {
    setCourseData({ ...courseData, newCourseName: e.target.value });
  };

  const handleSubmit = async () => {
    if (!courseData.courseID || !courseData.newCourseName) {
      message.error('Please select a course and enter a new course name');
      return;
    }

    const response = await fetch(`/api/updateCourse`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });

    if (response.ok) {
      message.success('Course updated successfully!');
    } else {
      message.error('An error occurred while updating the course. Please try again.');
    }
  };

  return (
    <div>
      <h1>Update Course</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Select Course ID" name="courseID" rules={[{ required: true, message: 'Please select a course' }]}>
          <Select placeholder="Select a course" onChange={handleChange}>
            {/* Map through courses and return Select.Option for each */}
            {courses.map((course) => (
              <Select.Option key={course.courseID} value={course.courseID}>{course.courseID}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="New Course Name" name="newCourseName" rules={[{ required: true, message: 'Please enter a new course name' }]}>
          <Input placeholder="New Course Name" onChange={handleNewCourseNameChange} />
        </Form.Item>
        <Form.Item label="Course Subject ID" name="courseSubjectID">
          <Input onChange={(e) => handleChange('courseSubjectID', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Term" name="courseTerm">
          <Input onChange={(e) => handleChange('courseTerm', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Start Time" name="courseStartTime">
          <TimePicker format='HH:mm' onChange={(time, timeString) => handleChange('courseStartTime', timeString)} />
        </Form.Item>
        <Form.Item label="Course End Time" name="courseEndTime">
          <TimePicker format='HH:mm' onChange={(time, timeString) => handleChange('courseEndTime', timeString)} />
        </Form.Item>
        <Form.Item label="Course Days Of Week" name="courseDaysOfWeek">
          <Input onChange={(e) => handleChange('courseDaysOfWeek', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Room" name="courseRoom">
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
        <Form.Item label="Course Seats" name="courseSeats">
          <InputNumber min={0} onChange={(value) => handleChange('courseSeats', value)} />
        </Form.Item>
        <Form.Item label="Course Students" name="courseStudents">
          <Input onChange={(e) => handleChange('courseStudents', e.target.value)} />
        </Form.Item>
        <Form.Item label="Course Wait List" name="courseWaitList">
          <Input onChange={(e) => handleChange('courseWaitList', e.target.value)} />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleSubmit} htmlType="submit">
        Update Course
      </Button>
    </div>
  );
}