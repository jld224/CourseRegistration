import { useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState({ student: false, faculty: false });

    const handleRegister = async () => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, userType })
        });

        const result = await response.json();
        if (result.success) {
            message.success('Registration successful!');
        } else {
            message.error(result.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <Form layout="vertical" onFinish={handleRegister}>
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
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
