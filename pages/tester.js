import { useEffect, useState } from 'react'

export default function CourseList () {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('/api/tester')
      .then(response => response.json())
      .then(data => setCourses(data))
  }, [])
  
  return (
    <div>
      <h1>Courses</h1>
      {courses.map(course => (
        <div key={course.courseID}>
          <p>Name: {course.courseName}</p>
          <p>Term: {course.courseTerm}</p>
          <p>Start Time: {course.courseStartTime}</p>
          {/* more course data... */}
        </div>
      ))}
    </div>
  )
}