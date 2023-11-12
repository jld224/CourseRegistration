const pool = require('./db.js');

// Insert a course into courses table
const insertCourse = async (courseData) => {
  const query = `
    INSERT INTO courses (courseID, courseName, courseSubjectID, courseTerm, courseStartTime, courseEndTime, courseDaysOfWeek, courseRoom, courseLocation, courseCredits, courseCareer, courseInstructor, prerequisites, corequisites, courseSeats, courseStudents, courseWaitList)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [courseData.courseID, courseData.courseName, courseData.courseSubjectID, courseData.courseTerm, courseData.courseStartTime, courseData.courseEndTime, courseData.courseDaysOfWeek, courseData.courseRoom, courseData.courseLocation, courseData.courseCredits, courseData.courseCareer, courseData.courseInstructor, courseData.prerequisites, courseData.corequisites, courseData.courseSeats, courseData.courseStudents, courseData.courseWaitList];
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

const joinCourse = async (userID, courseID) => {
  // Define queries
  const updateStudentsQuery = `
    UPDATE students
    SET coursesTaking = JSON_ARRAY_APPEND(
      IFNULL(
        JSON_UNQUOTE(COALESCE(coursesTaking, '[]')),
        '[]'
      ),
      '$',
      ?
    )
    WHERE userID = ?;
  `;

  const updateCoursesQuery = `
    UPDATE courses
    SET courseStudents = JSON_ARRAY_APPEND(
      IFNULL(
        JSON_UNQUOTE(COALESCE(courseStudents, '[]')),
        '[]'
      ),
      '$',
      ?
    )
    WHERE courseID = ?;
  `;

  // Execute both queries in a transaction
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Update students table
    await connection.query(updateStudentsQuery, [courseID, userID]);

    // Add userID to courseStudents in courses table
    await connection.query(updateCoursesQuery, [userID, courseID]);

    await connection.commit();

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const dropCourse = async (userID, courseID) => {
  const deleteFromStudentsQuery = `
    UPDATE students
    SET coursesTaking = 
      JSON_REMOVE(
        IFNULL(
          JSON_UNQUOTE(COALESCE(coursesTaking, '[]')),
          '[]'
        ),
        JSON_UNQUOTE(JSON_SEARCH(
          IFNULL(
            JSON_UNQUOTE(COALESCE(coursesTaking, '[]')),
            '[]'
          ),
          'one',
          '${courseID}',
          NULL,
          '$[*]'
        ))
      )
    WHERE userID = '${userID}';
  `;

  const deleteFromCoursesQuery = `
    UPDATE courses
    SET courseStudents = 
      JSON_REMOVE(
        IFNULL(
          JSON_UNQUOTE(COALESCE(courseStudents, '[]')),
          '[]'
        ),
        JSON_UNQUOTE(JSON_SEARCH(
          IFNULL(
            JSON_UNQUOTE(COALESCE(courseStudents, '[]')),
            '[]'
          ),
          'one',
          '${userID}',
          NULL,
          '$[*]'
        ))
      )
    WHERE courseID = '${courseID}';
  `;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Remove userID from coursesTaking in students table
    await connection.query(deleteFromStudentsQuery);

    // Remove userID from courseStudents in courses table
    await connection.query(deleteFromCoursesQuery);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  insertCourse,
  updateCourse,
  removeCourse,
  verifyUserCredentials,
  registerUser,
  joinCourse,
  dropCourse
};
