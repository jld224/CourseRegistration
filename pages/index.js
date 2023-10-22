import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const HomePage = () => (
  <div>
    
    <div className="hero">
      <h1 className="hero-title">Welcome to our Course Registration System</h1>
      <p className="hero-description">Join us and expand your knowledge.</p>
      <Link href="/courses">Browse Courses</Link>
    </div>

    <div className="content">
      <h2>About Us</h2>
      <p>We provide a platform that connects students and teachers to make learning easier and efficient.</p>
    </div>
  </div>
);

export default HomePage;