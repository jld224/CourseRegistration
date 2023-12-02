import nookies from 'nookies';

export default async function logout(req, res) {
  // Clear the cookie
  nookies.set({ res }, 'studentId', '', {
    maxAge: -1,
    path: '/',
    httpOnly: true,
  });

  // Optionally, you could do the same for other user types if needed

  // Respond with a JSON object
  res.status(200).json({ success: true });
}