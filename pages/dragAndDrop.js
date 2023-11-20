import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Form, message } from 'antd';

const DragAndDrop = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [userID, setUserID] = useState('');
  const pageSize = 6; 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/dragAndDrop');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const ampm = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    return `${formattedHours}:${minutes}${ampm}`;
  };

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'courseID',
      key: 'courseID',
      render: (text, record) => <div draggable onDragStart={(e) => handleDragStart(e, record)}>{text}</div>,
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Course Subject ID',
      dataIndex: 'courseSubjectID',
      key: 'courseSubjectID',
    },
    {
      title: 'Course Term',
      dataIndex: 'courseTerm',
      key: 'courseTerm',
    },
    {
      title: 'Time',
      dataIndex: 'timeRange',
      key: 'timeRange',
    },
  ];

  const processedData = courses.map((course) => {
    const startTime = formatTime(course.courseStartTime);
    const endTime = formatTime(course.courseEndTime);
    return {
      ...course,
      timeRange: `${startTime} - ${endTime}`,
    };
  });

  const filteredData = searchText
    ? processedData.filter((course) =>
        course.courseName.toLowerCase().includes(searchText.toLowerCase())
      )
    : processedData;

  const startIndex = (currentPage - 1) * pageSize;

  const currentCourses = filteredData.slice(startIndex, startIndex + pageSize);

  const handleDragStart = (e, course) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(course));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedCourse = JSON.parse(e.dataTransfer.getData('text/plain'));
    setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, droppedCourse]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const selectedColumns = [
    {
      title: 'Selected Courses',
      dataIndex: 'courseName',
      key: 'courseName',
    },
  ];

  const handleUserIDChange = (e) => {
    setUserID(e.target.value);
  };

  const handleJoinCourse = async () => {
    if (!userID) {
      message.error('Please input your userID.');
      return;
    }

    for (const selectedCourse of selectedCourses) {
      const response = await fetch('/api/joinCourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, courseID: selectedCourse.courseID }),
      });

      if (response.status !== 200) {
        message.error('An error occurred joining the course.');
        return;
      }
    }

    message.success('Courses joined successfully.');
  };

  return (
    <div>
      <h1>Course Search</h1>
      <Input
        placeholder="Search by Course Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={currentCourses}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredData.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <h2>Selected Courses</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '1px dashed #ccc', padding: '10px', marginBottom: '16px' }}
      >
        <Table dataSource={selectedCourses} columns={selectedColumns} />
      </div>
      <Form>
        <Form.Item label="User ID" name="userID" rules={[{ required: true, message: 'Please input your userID' }]}>
          <Input placeholder="User ID" value={userID} onChange={handleUserIDChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleJoinCourse}>
            Join Selected Courses
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DragAndDrop;
