import { verifyUserCredentials } from '../../db/dbQueries.js';

export default async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        const user = await verifyUserCredentials(email, password, userType);
        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false, message: 'Entered information incorrect' });
        }
    } catch (error) {
        res.status(500).send('Error during login.');
    }
};
