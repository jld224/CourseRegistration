import { registerUser } from '../../db/dbQueries.js';

export default async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        const user = await registerUser(email, password, userType);
        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: 'Registration failed.' });
        }
    } catch (error) {
        res.status(500).send('Error during registration.');
    }
};
