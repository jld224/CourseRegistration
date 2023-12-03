// pages/studentProfile.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function StudentProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if userId is available
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // If not logged in, redirect to the login page or handle accordingly
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
        // Handle any errors
        console.error('Failed to fetch profile');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]); // Added router as a dependency

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  // If not logged in, you might not want to render the profile
  if (!profile) {
    return <div>No profile data.</div>;
  }

  return (
    <div>
      <h1>Student Profile</h1>
      <p><strong>Name:</strong> {profile.studentName}</p>
      <p><strong>Program:</strong> {profile.studentProgram}</p>
      {/* Render additional information as needed */}
    </div>
  );
}
