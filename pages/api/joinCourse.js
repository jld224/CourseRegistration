import { joinCourse } from '../../db/dbQueries.js';

export default async (req, res) => {
  try {
    const { userId, courseID } = req.body;
    await joinCourse(userId, courseID);
    res.status(200).send('Course added to student successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding course to student.');
  }
};