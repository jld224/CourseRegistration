import { dropCourse } from '../../db/dbQueries';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { userId, courseID } = req.query;

    if (!userId || !courseID) {
      return res.status(400).json({ error: 'UserID and courseID are required' });
    }

    try {
      const updatedProfile = await dropCourse(userId, courseID);
      return res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}