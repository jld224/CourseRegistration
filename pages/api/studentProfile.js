// pages/api/studentProfile.js

import { getStudentProfile } from '../../db/dbQueries';

export default async function(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'UserID is required' });
  }

  try {
    const profile = await getStudentProfile(userId);
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
