import { dropCourse } from '../../db/dbQueries.js';

export default async (req, res) => {
  try {
    const { userID, courseID } = req.body;
    await dropCourse(userID, courseID); // Change function call to dropCourse
    res.status(200).send('Course dropped from student successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error dropping course from student.');
  }
};