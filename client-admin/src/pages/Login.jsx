import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await login(values);
      // Assuming res contains { token: '...' } based on common practices, 
      // but if api interceptor returns response.data, and backend returns { code: 0, data: { token } }, 
      // we need to adjust. For now assuming standard { token } or { data: { token } }.
      // Let's assume the interceptor returns the body directly.
      
      const token = res.token || res.data?.token; 
      
      if (token) {
        localStorage.setItem('token', token);
        message.success('Login successful');
        navigate('/');
      } else {
         // Fallback if structure is different
         message.error('Login failed: No token received');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Admin Login" style={{ width: 400 }} bordered={false} className="shadow-lg">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
