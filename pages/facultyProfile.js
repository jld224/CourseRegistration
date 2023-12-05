import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function FacultyProfile() {
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
      const response = await fetch(`/api/facultyProfile?userId=${userId}`);
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
      <h1>Faculty Profile</h1>
      <p><strong>Name:</strong> {profile.facultyName}</p>
      <p><strong>Title:</strong> {profile.facultyTitle}</p>
      <p><strong>Department:</strong> {profile.facultyDepartment}</p>
      <p><strong>Courses:</strong> {profile.facultyCoursesTeaching}</p>
    </div>
  );
}
