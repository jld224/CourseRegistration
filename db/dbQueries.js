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

// Remove a course from courses table by courseName
const removeCourse = async (courseData) => {
  const query = `
    DELETE FROM courses
    WHERE courseName = ?;
  `;
  const values = [courseData.courseName];
  await pool.query(query, values);
};

module.exports = {
  insertCourse,
  removeCourse
};
