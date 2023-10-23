import db from '../../../db/db'; // Get this from wherever your database connection is

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    // Fetch course details from your database using the `id` param
    const course = await db.query(`SELECT * FROM courses WHERE courseID = ?`, [id]);

    // If course does not exist, return a 404 status
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Return the course data
    res.status(200).json(course);
  } catch(e) {
    // Handle any errors with the database query
    res.status(500).json({ error: 'An error occurred while fetching course data.' });
  }
}