import { updateCourse } from '../../db/dbQueries.js'; // Import the function for updating a course

export default async (req, res) => {
  try {
    const { courseID, newCourseName } = req.body; // Destructure courseID and newCourseName from the request body
    await updateCourse(courseID, newCourseName); // Call the function to update the course

    res.status(200).send('Course updated successfully.');
  } catch (error) {
    res.status(500).send('Error updating course.');
  }
};
