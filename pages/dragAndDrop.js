import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Form, message } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import StudentLayout from '../components/StudentLayout';


const DragAndDrop = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [userId, setUserID] = useState('');
  const [events, setEvents] = useState([]);
  const pageSize = 6;
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserID(userId);
    } else {
      message.error('No userID found in storage. Please login.');
    }
  }, []);

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

  useEffect(() => {
    const courseEvents = selectedCourses.flatMap((course) => {
      if (!course.courseDaysOfWeek || !course.courseStartTime || !course.courseEndTime) {
        return [];
      }
    
      const daysOfWeek = Array.isArray(course.courseDaysOfWeek)
        ? course.courseDaysOfWeek
        : [course.courseDaysOfWeek];
    
      return daysOfWeek.map((dayOfWeek) => {
        const startDate = moment().day(dayOfWeek).set({
          h: parseInt(course.courseStartTime.split(':')[0]),
          m: parseInt(course.courseStartTime.split(':')[1]),
        });
        const endDate = moment().day(dayOfWeek).set({
          h: parseInt(course.courseEndTime.split(':')[0]),
          m: parseInt(course.courseEndTime.split(':')[1]),
        });
    
        return {
          title: course.courseName,
          start: startDate.toDate(),
          end: endDate.toDate(),
        };
      });
    });
    
    setEvents(courseEvents);
  }, [selectedCourses]);

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
      title: 'Days',
      dataIndex: 'courseDaysOfWeek',
      key: 'courseDaysOfWeek',
    },
    {
      title: 'Time',
      dataIndex: 'timeRange',
      key: 'timeRange',
    },
    {
      title: 'Pre-requisite',
      dataIndex: 'prerequisites',
      key: 'prerequisites',
      render: prerequisites => {
        if (typeof prerequisites === 'string') {
          try {
            const parsed = JSON.parse(prerequisites);
            if (Array.isArray(parsed)) {
              return parsed.join(', ');
            }
            return prerequisites;
          } catch {
            return prerequisites;
          }
        }

        if (Array.isArray(prerequisites)) {
          return prerequisites.join(', ');
        }

        return '';
      }
    },
    {
      title: 'Co-requisite',
      dataIndex: 'corequisites',
      key: 'corequisites',
      render: corequisites => {
        if (typeof corequisites === 'string') {
          try {
            const parsed = JSON.parse(corequisites);
            if (Array.isArray(parsed)) {
              return parsed.join(', ');
            }
            return corequisites;
          } catch {
            return corequisites;
          }
        }
        
        if (Array.isArray(corequisites)) {
          return corequisites.join(', ');
        }
  
        return '';
      }
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

    if (droppedCourse.courseDaysOfWeek && droppedCourse.courseStartTime && droppedCourse.courseEndTime) {
      setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, droppedCourse]);
    } else {
      setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, droppedCourse]);
    }
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
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 100, 
      align: 'center',
      render: (text, record) => (
        <Button type="danger" size="small" onClick={() => handleRemoveCourse(record)}>
          Remove
        </Button>
      ),
    },
  ];

  const handleRemoveCourse = (courseToRemove) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.filter((course) => course.courseID !== courseToRemove.courseID)
    );
  };

  const handleJoinCourse = async () => {
    if (!userId) {
      message.error('Please login to get your userID.');
      return;
    }

    const overlappingCourses = findOverlappingCourses(selectedCourses);
    if (overlappingCourses.length > 0) {
      const errorMessages = overlappingCourses.map((overlap) => {
        const { courseName, courseDaysOfWeek, courseStartTime, courseEndTime } = overlap;
        return `${courseName} has overlapping schedule on ${courseDaysOfWeek.join(', ')} from ${courseStartTime} to ${courseEndTime}`;
      });

      message.error(`Courses have overlapping schedules:\n${errorMessages.join('\n')}`);
      return;
    }

    for (const selectedCourse of selectedCourses) {
      const response = await fetch('/api/joinCourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseID: selectedCourse.courseID }),
      });

      if (response.status !== 200) {
        message.error('An error occurred joining the course.');
        return;
      }
    }

    message.success('Courses joined successfully.');
  };

  const customFormats = {
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, 'dddd', culture), 
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, 'MMMM DD', culture),
  };

  const findOverlappingCourses = (courses) => {
    const overlappingCourses = [];

    for (let i = 0; i < courses.length - 1; i++) {
      for (let j = i + 1; j < courses.length; j++) {
        if (coursesOverlap(courses[i], courses[j])) {
          overlappingCourses.push(courses[i], courses[j]);
        }
      }
    }

    return overlappingCourses;
  };

  const coursesOverlap = (course1, course2) => {
    if (
      !course1.courseDaysOfWeek ||
      !Array.isArray(course1.courseDaysOfWeek) ||
      !course2.courseDaysOfWeek ||
      !Array.isArray(course2.courseDaysOfWeek)
    ) {
      return false;
    }
  
    const daysOverlap = course1.courseDaysOfWeek.some((day) =>
      course2.courseDaysOfWeek.includes(day)
    );
  
    if (!daysOverlap) {
      return false;
    }
  
    const start1 = moment(course1.courseStartTime, 'HH:mm');
    const end1 = moment(course1.courseEndTime, 'HH:mm');
    const start2 = moment(course2.courseStartTime, 'HH:mm');
    const end2 = moment(course2.courseEndTime, 'HH:mm');
  
    return (
      (start1.isSameOrBefore(end2) && end1.isAfter(start2)) ||
      (start2.isSameOrBefore(end1) && end2.isAfter(start1))
    );
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
        <Form.Item>
          <Button type="primary" onClick={handleJoinCourse}>
            Join Selected Courses
          </Button>
        </Form.Item>
      </Form>
      <style>{`
        .rbc-current-time-indicator {
          display: none !important;
        }
      `}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        toolbar={false}
        showCurrentTimeIndicator={false}
        formats={customFormats}
      />
    </div>
  );
};

DragAndDrop.Layout = StudentLayout;

export default DragAndDrop;