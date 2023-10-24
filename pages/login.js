import { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email.trim() || !password.trim()) {
      message.error("Email and password must be filled out.");
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      console.error('API request failed', response.status, response.statusText);
      return;
    }

    const result = await response.json();

    if (result.success) {
      message.success('Logged in successfully!');
      router.push('/');
    } else {
      message.error(result.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
             Login
          </Button>
        </Form.Item>
      </Form>

      {isLoading && <Spin />}
    </div>
  );
}
