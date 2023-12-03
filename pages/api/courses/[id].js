import pool from '../../../db/db'; // Import the pool directly

export default async function handler(req, res) {
  // Destructure `id` from `req.query`, assuming that's how the client sends the course name
  const { id: courseName } = req.query;

  // Verify that the method is GET; otherwise, reject the request
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch course details from your database using the `courseName` param
    const [results] = await pool.query('SELECT * FROM courses WHERE courseName = ?', [courseName]);

    // Check if the results array is empty (no course found with that name)
    if (results.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // If a course is found, send back the first result in the array
    return res.status(200).json(results[0]);
  } catch (error) {
    // Log and respond with any errors during database query execution
    console.error('Database error:', error); // Server-side logging of the error
    return res.status(500).json({ error: 'An error occurred while fetching course data.' });
  }
}