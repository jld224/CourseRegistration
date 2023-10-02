import Link from 'next/link'

export default function Home() {
    return (
      <div>
        <h1>Welcome to the Course Registration System</h1>
        <p>Easily browse and register for your courses.</p>
        <a href="/courses">View Courses</a>
        <br/>
        <Link href="/about">Go to About Page</Link>
        <br/>
        <Link href="/register">Go to About Page</Link>
      </div>
    );
  }