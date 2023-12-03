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
  const updateStudentsQueryWaitList = `
    UPDATE students
    SET 
      coursesWaiting = JSON_ARRAY_APPEND(
        IFNULL(
          JSON_UNQUOTE(COALESCE(coursesWaiting, '[]')),
          '[]'
        ),
        '$',
        ?
      )
    WHERE userID = ?;
  `;

  const updateStudentsQueryNormal = `
    UPDATE students
    SET 
      coursesTaking = JSON_ARRAY_APPEND(
        IFNULL(
          JSON_UNQUOTE(COALESCE(coursesTaking, '[]')),
          '[]'
        ),
        '$',
        ?
      )
    WHERE userID = ?;
  `;

  const getCourseInfoQuery = `
    SELECT courseStudents, courseSeats, courseWaitList
    FROM courses
    WHERE courseID = ?;
  `;

  const updateCoursesQueryWaitList = `
    UPDATE courses
    SET 
      courseWaitList = JSON_ARRAY_APPEND(
        IFNULL(
          JSON_UNQUOTE(COALESCE(courseWaitList, '[]')),
          '[]'
        ),
        '$',
        ?
      )
    WHERE courseID = ?;
  `;

  const updateCoursesQueryNormal = `
    UPDATE courses
    SET 
      courseStudents = JSON_ARRAY_APPEND(
        IFNULL(
          JSON_UNQUOTE(COALESCE(courseStudents, '[]')),
          '[]'
        ),
        '$',
        ?
      )
    WHERE courseID = ?;
  `;

  const isUserTakingCourseQuery = `
    SELECT COUNT(*) AS count
    FROM students
    WHERE userID = ? AND JSON_SEARCH(coursesTaking, 'one', ?, NULL, '$[*]') IS NOT NULL;
  `;

  const hasUserTakenCourseQuery = `
    SELECT COUNT(*) AS count
    FROM students
    WHERE userID = ? AND JSON_SEARCH(coursesPassed, 'one', ?, NULL, '$[*]') IS NOT NULL;
  `;

  const isUserWaitingCourseQuery = `
    SELECT COUNT(*) AS count
    FROM students
    WHERE userID = ? AND JSON_SEARCH(coursesWaiting, 'one', ?, NULL, '$[*]') IS NOT NULL;
  `;

  const getCoursePrerequisitesQuery = `
    SELECT prerequisites
    FROM courses
    WHERE courseID = ?;
  `;

  const getStudentCoursesPassedQuery = `
    SELECT coursesPassed
    FROM students
    WHERE userID = ?;
  `;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Get the prerequisites for the selected course
    const [coursePrerequisites] = await connection.query(getCoursePrerequisitesQuery, [courseID]);
    const prerequisites = coursePrerequisites[0].prerequisites;

    // Get the courses passed by the student
    const [studentCoursesPassed] = await connection.query(getStudentCoursesPassedQuery, [userID]);
    const coursesPassed = studentCoursesPassed[0].coursesPassed;

    // Check if prerequisites is null or the student has passed all prerequisites
    const hasPrerequisites = prerequisites === null || (prerequisites && coursesPassed &&
      prerequisites.every(prerequisite => coursesPassed.includes(prerequisite)));

    if (!hasPrerequisites) {
      throw new Error('Student does not meet the prerequisites for this course.');
    }

    const isUserTakingCourseResult = await connection.query(isUserTakingCourseQuery, [userID, courseID]);
    const isUserTakingCourse = isUserTakingCourseResult[0][0].count > 0;

    if (isUserTakingCourse) {
      throw new Error('User is already taking the course.');
    }

    const hasUserTakenCourseResult = await connection.query(hasUserTakenCourseQuery, [userID, courseID]);
    const hasUserTakenCourse = hasUserTakenCourseResult[0][0].count > 0;

    if (hasUserTakenCourse) {
      throw new Error('User has already passed the course.');
    }

    const isUserWaitingCourseResult = await connection.query(isUserWaitingCourseQuery, [userID, courseID]);
    const isUserWaitingCourse = isUserWaitingCourseResult[0][0].count > 0;

    if (isUserWaitingCourse) {
      throw new Error('User is already in the waitlist for the course.');
    }

    const courseInfo = await connection.query(getCourseInfoQuery, [courseID]);
    const { courseStudents, courseSeats, courseWaitList } = courseInfo[0][0];

    let numberOfStudents;

    if (courseStudents === null) {
      numberOfStudents = 0;
    } else {
      numberOfStudents = courseStudents.length;
    }

    if (numberOfStudents >= courseSeats) {
      await connection.query(updateCoursesQueryWaitList, [userID, courseID]);
      await connection.query(updateStudentsQueryWaitList, [courseID, userID]);
    }

    else {
      await connection.query(updateCoursesQueryNormal, [userID, courseID]);
      await connection.query(updateStudentsQueryNormal, [courseID, userID]);
    }

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
          ?,
          NULL,
          '$[*]'
        ))
      )
    WHERE userID = ?;
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
          ?,
          NULL,
          '$[*]'
        ))
      )
    WHERE courseID = ?;
  `;

  const getCourseWaitListQuery = `
    SELECT JSON_UNQUOTE(JSON_EXTRACT(courseWaitList, '$[0]')) AS waitListedUser
    FROM courses
    WHERE courseID = ?;
  `;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const waitListedUser = await connection.query(getCourseWaitListQuery, [courseID]);
    const waitListedUserID = waitListedUser[0][0].waitListedUser;

    const deleteFromCoursesAndStudentsQuery = `
      UPDATE courses c
      SET c.courseStudents = 
        JSON_ARRAY_APPEND(
          IFNULL(
            JSON_UNQUOTE(COALESCE(c.courseStudents, '[]')),
            '[]'
          ),
          '$',
          ?
        ),
      c.courseWaitList = 
        JSON_REMOVE(
          IFNULL(
            JSON_UNQUOTE(COALESCE(c.courseWaitList, '[]')),
            '[]'
          ),
          JSON_UNQUOTE(JSON_SEARCH(
            IFNULL(
              JSON_UNQUOTE(COALESCE(c.courseWaitList, '[]')),
              '[]'
            ),
            'one',
            ?,
            NULL,
            '$[*]'
          ))
        )
      WHERE c.courseID = ?;
    `;

    const moveFromWaitingToTakingQuery = `
      UPDATE students s
      SET s.coursesTaking = 
        JSON_ARRAY_APPEND(
          IFNULL(
            JSON_UNQUOTE(COALESCE(s.coursesTaking, '[]')),
            '[]'
          ),
          '$',
          ?
        ),
      s.coursesWaiting = 
        JSON_REMOVE(
          IFNULL(
            JSON_UNQUOTE(COALESCE(s.coursesWaiting, '[]')),
            '[]'
          ),
          JSON_UNQUOTE(JSON_SEARCH(
            IFNULL(
              JSON_UNQUOTE(COALESCE(s.coursesWaiting, '[]')),
              '[]'
            ),
            'one',
            ?,
            NULL,
            '$[*]'
          ))
        )
      WHERE s.userID = ?;
    `;

    await connection.query(deleteFromStudentsQuery, [courseID, userID]);
    await connection.query(deleteFromCoursesQuery, [userID, courseID]);

    if (waitListedUserID) {
      await connection.query(deleteFromCoursesAndStudentsQuery, [waitListedUserID, waitListedUserID, courseID]);
      await connection.query(moveFromWaitingToTakingQuery, [courseID, waitListedUserID, waitListedUserID]);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const dragAndDrop = async () => {
  const query = `
    SELECT courseID, courseName, courseSubjectID, courseTerm, courseStartTime, courseEndTime, courseDaysOfWeek
    FROM courses;
  `;
  const [results] = await pool.query(query);
  return results;
};

module.exports = {
  insertCourse,
  updateCourse,
  removeCourse,
  verifyUserCredentials,
  registerUser,
  joinCourse,
  dropCourse,
  dragAndDrop
};

