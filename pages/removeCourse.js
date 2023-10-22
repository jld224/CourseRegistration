// pages/removeCourse.js
import { useState } from 'react';

export default function RemoveCourse() {
  const [courseName, setCourseName] = useState('');

  const handleChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/removeCourse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseName })
    });

    // Handle the response here (e.g., show success or error message)
  };

  return (
    <div>
      <h1>Remove Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseName"
          value={courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <button type="submit">Remove Course</button>
      </form>
    </div>
  );
}
