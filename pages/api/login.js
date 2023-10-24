import pool from '../../db/db';
import bcrypt from 'bcrypt';

export default async function(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // Verify that all fields are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing necessary fields' });
  }

  try {
    const [userResults] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // Check if user exists
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'No user found with that email.' });
    }

    const user = userResults[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // successful login
    return res.status(200).json({ success: true, message: 'Login successful!' });

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred during login.' });
  }
}