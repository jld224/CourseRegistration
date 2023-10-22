import { insertCourse } from '../../db/dbQueries.js';

export default async (req, res) => {
  try {
    await insertCourse(req.body);
    res.status(200).send('Course inserted successfully.');
  } catch (error) {
    res.status(500).send('Error inserting course.');
  }
};

