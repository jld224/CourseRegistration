import { useEffect, useState } from 'react'

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
  
  return (
    <div>
      <h1>Courses</h1>
      <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
      {filteredCourses.map(course => (
        <div key={course.courseID} style={{border: '1px solid #ddd', borderRadius: '5px', margin: '10px', padding: '10px'}}>
          <h4 style={{margin: '0 0 10px 0'}}>{course.courseName}</h4>
          <p><b>Subject IDs:</b> {course.courseSubjectID}</p>
          <p><b>Terms:</b> {course.courseTerm}</p>
          <p><b>Time:</b> {course.courseStartTime} - {course.courseEndTime}</p>
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