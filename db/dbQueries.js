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

// Update a course into courses table
const updateCourse = async (courseID, newCourseName) => {
  const query = `
    UPDATE courses
    SET courseName = ?
    WHERE courseID = ?;
  `;
  const values = [newCourseName, courseID];
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

const verifyUserCredentials = async (email, password, userType) => {
  const userTypeValue = userType.student ? 'Student' : userType.faculty ? 'Faculty' : null;
  const query = `
      SELECT * FROM users WHERE email = ? AND password = ? AND userType = ?;
  `;
  const [results] = await pool.query(query, [email, password, userTypeValue]);
  return results.length > 0;
};

const registerUser = async (email, password, userType) => {
  const userTypeValue = userType.student ? 'Student' : userType.faculty ? 'Faculty' : null;
  const query = `
      INSERT INTO users (email, password, userType) VALUES (?, ?, ?);
  `;
  const [results] = await pool.query(query, [email, password, userTypeValue]);
  return results.affectedRows > 0;
};

module.exports = {
  insertCourse,
  updateCourse,
  removeCourse,
  verifyUserCredentials,
  registerUser
};
