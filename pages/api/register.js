import pool from '../../db/db';
import bcrypt from 'bcrypt';

export default async function(req, res) {
  if(req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { email, password, userType, name, titleOrProgram, department } = req.body;

  if(!(email && password && userType && name && titleOrProgram && (userType === 'Faculty' ? department  : true)) ) {
    return res.status(400).json({ error: 'Missing necessary fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    try {
    await connection.beginTransaction();
    
    const [userResults] = await connection.query('INSERT INTO users (email, password, userType) VALUES (?, ?, ?)', [ email, hashedPassword, userType ]);
    const userId = userResults.insertId;
    
    if(userType === 'Student') {
      const [studentResults] = await connection.query('INSERT INTO students (userID, studentName, studentProgram) VALUES (?, ?, ?)', [ userId, name, titleOrProgram ]);
    } else {
      const [studentResults] = await connection.query('INSERT INTO students (userID, studentName, studentProgram) VALUES (?, ?, ?)', [ userId, 'Placeholder', 'Placeholder' ]);
    }
        
    if(userType === 'Faculty') {
      const [facultyResults] = await connection.query('INSERT INTO faculty (userID, facultyName, facultyTitle, facultyDepartment) VALUES (?, ?, ?, ?)', [ userId, name, titleOrProgram, department ]);
    } else {
      const [facultyResults] = await connection.query('INSERT INTO faculty (userID, facultyName, facultyTitle, facultyDepartment) VALUES (?, ?, ?, ?)', [ userId, 'Placeholder', 'Placeholder', 'Placeholder' ]);
    }
    await connection.commit();

    return res.status(200).json({ success: true, message: 'User registered successfully' });

    } catch (error) {
    await connection.rollback();
    throw error;

    } finally {
    connection.release();
    }

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred during registration.' });
  }
};