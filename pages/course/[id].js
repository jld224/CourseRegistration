import { useEffect, useState } from 'react'

HomePage.Layout = HomeLayout;

export default function Course({ courseId }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    console.log('Fetching course data for courseId:', courseId);

    fetch(`/api/courses/${courseId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Received data:', data); // Log the received data

        if (data.error) {
          // Handle potential error response from the API
          console.error('API error:', data.error);
        } else {
          // Use course data if no length is undefined (a single object)
          setCourse(Array.isArray(data) && data.length ? data[0] : data);
        }
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [courseId]);

  // Log the course state after it has been set
  useEffect(() => {
    console.log('Course state has been set:', course);
  }, [course]);

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
  );
}

Course.getInitialProps = async ({ query }) => {
  console.log('getInitialProps called with query:', query); // Log initial props query
  const { id } = query;
  return { courseId: id };
}