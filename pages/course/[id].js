import { useEffect, useState } from 'react'

export default function Course({ courseId }) {
  const [course, setCourse] = useState(null)

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.error) {
          // Handle error response
          console.error(data.error)
        } else {
          // Use course data if no length is undefined (a single object)
          setCourse(Array.isArray(data) && data.length ? data[0] : data)
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [courseId]);

  return (
    <div>
      {course ? (
        <>
          <h1>{course.courseName}</h1>
          <p><b>Course ID:</b> {course.courseID}</p>
          <p><b>Subject ID:</b> {course.courseSubjectID}</p>
          <p><b>Term:</b> {course.courseTerm}</p>
          <p><b>Start Time:</b> {course.courseStartTime}</p>
          <p><b>End Time:</b> {course.courseEndTime}</p>
          <p><b>Days of Week:</b> {JSON.stringify(course.courseDaysOfWeek)}</p>
          <p><b>Room:</b> {course.courseRoom}</p>
          <p><b>Location:</b> {course.courseLocation}</p>
          <p><b>Credits:</b> {course.courseCredits}</p>
          <p><b>Career:</b> {course.courseCareer}</p>
          <p><b>Instructor:</b> {course.courseInstructor}</p>
          <p><b>Prerequisites:</b> {JSON.stringify(course.prerequisites)}</p>
          <p><b>Corequisites:</b> {JSON.stringify(course.corequisites)}</p>
          <p><b>Seats:</b> {course.courseSeats}</p>
          <p><b>Students:</b> {JSON.stringify(course.courseStudents)}</p>
          <p><b>Wait List:</b> {JSON.stringify(course.courseWaitList)}</p>
        </>
      ) : (
        <p>Loading course...</p> 
      )}
    </div>
)
}

Course.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { courseId: id };
}