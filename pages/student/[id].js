import { useState, useEffect } from 'react'
import StudentLayout from '../../components/StudentLayout';

Student.Layout = StudentLayout; 

export default function Student({ studentId }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/api/students/${studentId}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          setStudent(Array.isArray(data) && data.length ? data[0] : data);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [studentId]);

  return (
    <div>
      {student ? (
        <>
          <h1>{student.studentName}</h1>
          <p>Program: {student.studentProgram}</p>
          <p>Courses Passed: {JSON.parse(student.coursesPassed || '[]').join(', ')}</p>
          <p>Courses Taking: {JSON.parse(student.coursesTaking || '[]').join(', ')}</p>
          <p>Courses Waiting: {JSON.parse(student.coursesWaiting || '[]').join(', ')}</p>
        </>
      ) : (
        <p>Loading student...</p>
      )}
    </div>
  )
}

Student.getInitialProps = async ({ query }) => {
  const { id } = query
  return { userID: id };
}