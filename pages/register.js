import { useState } from 'react';
import React from 'react';
import { Form, Input, Radio, Button, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import LoginLayout from '../components/LoginLayout';

RegisterPage.Layout = LoginLayout;

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(null);
    const [name, setName] = useState('');
    const [titleOrProgram, setTitleOrProgram] = useState('');
    const [department, setDepartment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);

        if (!email.trim() || !password.trim() || !userType || !name.trim() || !titleOrProgram.trim() || (userType === 'Faculty' && !department.trim())) {
            message.error("All fields must be completed.");
            setIsLoading(false);
            return;
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, userType, name, titleOrProgram, department })
        });

        setIsLoading(false);

        if (!response.ok) {
            console.error('API request failed', response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            message.success('Registration successful!');
            router.push('/login');
        } else {
            message.error(result.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <Form layout="vertical" onFinish={handleRegister}>
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
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                    <Input value={name} onChange={e => setName(e.target.value)} />
                </Form.Item>
                {userType === 'Student' && 
                    <Form.Item label="Program" name="titleOrProgram" rules={[{ required: true, message: 'Program is required' }]} >
                        <Input value={titleOrProgram} onChange={(e) => setTitleOrProgram(e.target.value)} />
                    </Form.Item>
                }
                {userType === 'Faculty' &&
                    <>
                        <Form.Item label="Title" name="titleOrProgram" rules={[{ required: true, message: 'Title is required' }]} >
                            <Input value={titleOrProgram} onChange={(e) => setTitleOrProgram(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Department is required' }]} >
                            <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </Form.Item>
                    </>
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
    
            {isLoading && <Spin />}
        </div>
    );    
}
