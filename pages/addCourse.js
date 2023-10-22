// pages/addCourse.js
import { useState } from 'react';

export default function AddCourse() {
  const [courseData, setCourseData] = useState({
    courseID: '',
    courseName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API route to insert the data
    const response = await fetch('/api/insertCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });

    // Handle the response here (e.g., show success or error message)
  };

  return (
    <div>
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseID"
          value={courseData.courseID}
          onChange={handleChange}
          placeholder="Course ID"
        />
        <input
          type="text"
          name="courseName"
          value={courseData.courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}
