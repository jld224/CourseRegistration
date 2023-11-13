import { useState } from 'react';
import { Form, Input, Radio, Button, message, Spin } from 'antd';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(null);
    const [name, setName] = useState('');
    const [titleOrProgram, setTitleOrProgram] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        // set loading true
        setLoading(true); 

        if (!email.trim() || !password.trim() || !userType || !name.trim() || !titleOrProgram.trim() || (userType == 'Faculty' && !department.trim())) {
            message.error("All fields must be completed.");
            setLoading(false); // stop loading in case of error
            return;
        }
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, userType, name, titleOrProgram, department })
        });

        // set loading false in finally block to ensure it gets turned off whether the request is successful or not.
        setLoading(false);

        if (!response.ok) {
            console.error('API request failed', response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            message.success('Registration successful!');
        } else {
            message.error(result.message);
        }
    };

    // If loading is true, display a spin component.
    if(loading) {
        return <Spin/>
    }

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
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        </div>
    );
}