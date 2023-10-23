import { useEffect, useState } from 'react'
import { Table, Tag, Space, Input } from 'antd';
import Link from 'next/link';


export default function CourseList () {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/api/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(courses => setCourses(courses))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text, record) => (
          <Link href={`/course/${record.courseID}`}>
            {text}
          </Link>
      )
    },
    {
      title: 'Subject Id',
      dataIndex: 'courseSubjectID',
      key: 'courseSubjectID',
    },
    {
      title: 'Term Test',
      dataIndex: 'courseTerm',
      key: 'courseTerm',
    },
    {
      title: 'Time',
      dataIndex: 'courseTime',
      key: 'courseTime',
      render: (text, record) => (
        <span>
          {record.courseStartTime} - {record.courseEndTime}
        </span>
      ),
    },
    /** You can add as many columns as you want. **/
  ];
  
  return (
    <div>
      <h1>Courses</h1>
      <Input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
      <Table columns={columns} dataSource={filteredCourses} rowKey="courseID" />
    </div>
  )
}