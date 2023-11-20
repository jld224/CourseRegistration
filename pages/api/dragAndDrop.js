import { dragAndDrop } from '../../db/dbQueries.js';

export default async (req, res) => {
  try {
    const courses = await dragAndDrop();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses.');
  }
};