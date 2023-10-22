import pool from '../../db/db';

export default async function(req, res) {
    if(req.method !== 'GET') {
        return res.status(405); // Method Not Allowed
    }
        
    try {
        const [results, fields] = await pool.query('SELECT * FROM courses');
        res.json(results);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred when trying to fetch courses.' });
    }
}