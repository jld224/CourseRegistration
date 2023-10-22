const pool = require('./db.js');

// Insert a course into courses table
const insertCourse = async (courseData) => {
  const query = `
    INSERT INTO courses (courseID, courseName)
    VALUES (?, ?);
  `;
  const values = [courseData.courseID, courseData.courseName];
  await pool.query(query, values);
};

module.exports = {
  insertCourse,
};
