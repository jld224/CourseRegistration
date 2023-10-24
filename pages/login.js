import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            message.error("Email and password must be filled out.");
            return;
        }
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            console.error('API request failed', response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            message.success('Logged in successfully!');
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
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
}