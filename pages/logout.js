import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Spin, message } from 'antd';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/logout', {
      method: 'POST', // You can also use GET, depending on your preference.
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        message.success('Logged out successfully!');
        router.push('/'); // Redirect to the main page (or wherever appropriate)
      }
    });
  }, [router]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <Spin size="large" tip="Logging out..." />
    </div>
  );
}