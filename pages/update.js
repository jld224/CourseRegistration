import { useState } from 'react';

export default function UpdateCourse() {
  const [courseID, setCourseID] = useState(''); // New state for courseID
  const [newCourseName, setNewCourseName] = useState(''); // New state for the updated courseName

  const handleCourseIDChange = (e) => {
    setCourseID(e.target.value);
  };

  const handleNewCourseNameChange = (e) => {
    setNewCourseName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your API endpoint with courseID and newCourseName
    const response = await fetch('/api/updateCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseID, newCourseName })
    });

    // Handle the response here (e.g., show success or error message)
  };

  return (
    <div>
      <h1>Update Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseID"
          value={courseID}
          onChange={handleCourseIDChange}
          placeholder="Course ID"
        />
        <input
          type="text"
          name="newCourseName"
          value={newCourseName}
          onChange={handleNewCourseNameChange}
          placeholder="New Course Name"
        />
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}
