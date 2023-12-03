import { useEffect, useState } from 'react';
import { Table, Tag, Space, Input } from 'antd';
import Link from 'next/link';
import HomeLayout from '../components/HomeLayout';

const { Search } = Input;


// Adjusted naming to follow proper convention for component naming
const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) => course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Add sorter functions for the columns you want to be sortable
  const columns = [
    {
      title: 'ID',
      dataIndex: 'courseID',
      key: 'courseID',
      sorter: (a, b) => a.courseID.localeCompare(b.courseID),
    },
    {
      title: 'Name',
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      render: text => <Link href={`/course/${text}`}>{text}</Link>,
    },
    {
      title: 'Subject Id',
      dataIndex: 'courseSubjectID',
      key: 'courseSubjectID',
      sorter: (a, b) => a.courseSubjectID.localeCompare(b.courseSubjectID),
    },
    {
      title: 'Term Test',
      dataIndex: 'courseTerm',
      key: 'courseTerm',
      sorter: (a, b) => a.courseTerm.localeCompare(b.courseTerm),
    },
    {
      title: 'Time',
      dataIndex: 'courseTime',
      key: 'courseTime',
      sorter: (a, b) => a.courseStartTime.localeCompare(b.courseStartTime), // Assuming startTime is sortable
      render: (text, record) => (
        <span>
          {record.courseStartTime} - {record.courseEndTime}
        </span>
      ),
    },
    // ... (add additional columns as needed)
  ];


  // Provide a rowKey function for the Table that returns a unique key for each row
  const getRowKey = (record) => record.courseID;

  return (
    <div style={{ padding: '2rem' }}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Course List</h1>
        <Search
          placeholder="Search by name"
          enterButton
          size="large"
          onSearch={handleSearch}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredCourses}
        rowKey={getRowKey}
        bordered
        pagination={{ pageSize: 10 }} // Adjust page size as needed
        style={{ marginTop: '1rem' }}
      />
    </div>
  );
};

HomePage.Layout = HomeLayout;

export default HomePage;