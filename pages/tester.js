import { useEffect, useState } from 'react'

export default function CourseList () {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/api/tester')
      .then(response => response.json())
      .then(data => setCourses(data))
  }, [])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div>
      <h1>Courses</h1>
      <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
      {filteredCourses.map(course => (
        <div key={course.courseID} style={{border: '1px solid #ddd', borderRadius: '5px', margin: '10px', padding: '10px'}}>
          <h4 style={{margin: '0 0 10px 0'}}>{course.courseName}</h4>
          <p><b>Subject ID:</b> {course.courseSubjectID}</p>
          <p><b>Term:</b> {course.courseTerm}</p>
          <p><b>Time:</b> {course.courseStartTime} - {course.courseEndTime}</p>
          <p><b>Days of Week:</b> {course.courseDaysOfWeek.join(', ')}</p>
          <p><b>Room:</b> {course.courseRoom}</p>
          <p><b>Location:</b> {course.courseLocation}</p>
          <p><b>Credits:</b> {course.courseCredits}</p>
          <p><b>Career:</b> {course.courseCareer}</p>
          <p><b>Instructor:</b> {course.courseInstructor}</p>
          <p><b>Seats Available:</b> {course.courseSeats}</p>
        </div>
      ))}
    </div>
  )
}