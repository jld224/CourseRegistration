import { removeCourse } from '../../db/dbQueries.js';

export default async (req, res) => {
  try {
    await removeCourse(req.body);
    res.status(200).send('Course removed successfully.');
  } catch (error) {
    res.status(500).send('Error removing course.');
  }
};
