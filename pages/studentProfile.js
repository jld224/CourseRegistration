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
      <p><strong>Currently Enrolled In:</strong> {Array.isArray(profile.coursesTaking) ? profile.coursesTaking.join(', ') : ''}</p>
      <p><strong>Courses Passed:</strong> {Array.isArray(profile.coursesPassed) ? profile.coursesPassed.join(', ') : ''}</p>
      <p><strong>Waitlist Courses:</strong> {Array.isArray(profile.coursesWaiting) ? profile.coursesWaiting.join(', ') : ''}</p>
    </div>
  );
}

StudentProfile.Layout = StudentLayout;
