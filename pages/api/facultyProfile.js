// pages/api/facultyProfile.js

import { getFacultyProfile } from '../../db/dbQueries';

export default async function(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'UserID is required' });
  }

  try {
    const profile = await getFacultyProfile(userId);
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(404).json({ error: 'Faculty not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
