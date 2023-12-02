import pool from '../../db/db';
import bcrypt from 'bcrypt';

export default async function(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  const { email, password, userType } = req.body;

  // Verify that all fields are provided
  if (!email || !password || !userType) {
    return res.status(400).json({ error: 'Missing necessary fields' });
  }

  try {
    // Assuming userType is either 'Student' or 'Faculty'
    const userTypeValue = userType === 'Student' ? 'Student' : 'Faculty';

    const [userResults] = await pool.query('SELECT * FROM users WHERE email = ? AND userType = ?', [email, userTypeValue]);

    // Check if user exists
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'No user found with that email and user type.' });
    }

    const user = userResults[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // successful login
    if (userType === 'Student') {
      res.setHeader('Set-Cookie', [`studentId=${user.studentId}; Path=/; HttpOnly`]);
    }
    return res.status(200).json({ success: true, message: 'Login successful!', userType: userTypeValue, userId: user.id });
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during login.' });
  }
}
