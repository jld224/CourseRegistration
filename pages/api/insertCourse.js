import { insertCourse } from '../../db/dbQueries.js';

export default async (req, res) => {
  try {
    await insertCourse(req.body);
    res.status(200).json({ message: 'Course inserted successfully.' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Error inserting course.');
  }
};