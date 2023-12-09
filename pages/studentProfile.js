import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StudentLayout from '../components/StudentLayout';

export default function StudentProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      const response = await fetch(`/api/studentProfile?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch profile');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleDropCourse = async (courseID) => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`/api/dropCourse?userId=${userId}&courseID=${courseID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    } else {
      console.error('Failed to drop course');
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>No profile data.</div>;
  }

  return (
    <div>
      <h1>Student Profile</h1>
      <p><strong>Name:</strong> {profile.studentName}</p>
      <p><strong>Program:</strong> {profile.studentProgram}</p>

      <h2>Currently Enrolled Courses:</h2>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(profile.coursesTaking) &&
            profile.coursesTaking.map(courseID => (
              <tr key={courseID}>
                <td>{courseID}</td>
                <td>
                  <button onClick={() => handleDropCourse(courseID)}>Drop Course</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <p><strong>Courses Passed:</strong> {Array.isArray(profile.coursesPassed) ? profile.coursesPassed.join(', ') : ''}</p>
      <p><strong>Waitlist Courses:</strong> {Array.isArray(profile.coursesWaiting) ? profile.coursesWaiting.join(', ') : ''}</p>
    </div>
  );
}

StudentProfile.Layout = StudentLayout;