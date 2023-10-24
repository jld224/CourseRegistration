import { useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState({ student: false, faculty: false });

    const handleSubmit = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, userType })
        });

        const result = await response.json();
        if (result.success) {
            // Redirect to the home page
            window.location.href = '/';
        } else {
            message.error(result.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Email" rules={[{ required: true }]}>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password" rules={[{ required: true }]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={userType.student} onChange={e => setUserType({ ...userType, student: e.target.checked })}>Student</Checkbox>
                    <Checkbox checked={userType.faculty} onChange={e => setUserType({ ...userType, faculty: e.target.checked })}>Faculty</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
