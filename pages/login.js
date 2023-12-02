import { useState } from 'react';
import React from 'react';
import { Form, Input, Button, Radio, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import LoginLayout from '../components/LoginLayout';

LoginPage.Layout = LoginLayout;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email.trim() || !password.trim() || !userType) {
      message.error("All fields must be filled out.");
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userType }),
    });

    setIsLoading(false);

    if (!response.ok) {
      console.error('API request failed', response.status, response.statusText);
      return;
    }

    const result = await response.json();

    if (result.success) {
      message.success('Logged in successfully!');
      if (userType === 'Faculty') {
        // Handle redirection for faculty users.
        router.push('/facultyBase');
      } else {
        // Include the userId in the URL for students.
        router.push(`/student/studentBasePage?id=${result.userId}`);
      }
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
        <Form.Item label="UserType" name="userType" rules={[{ required: true, message: 'UserType is required' }]}>
          <Radio.Group onChange={e => setUserType(e.target.value)} value={userType}>
              <Radio value="Student">Student</Radio>
              <Radio value="Faculty">Faculty</Radio>
          </Radio.Group>
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
