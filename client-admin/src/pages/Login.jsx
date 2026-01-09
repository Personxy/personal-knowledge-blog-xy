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
      // 假设 res 包含 { token: '...' }，基于常见做法，
      // 但如果 api 拦截器返回 response.data，而后端返回 { code: 0, data: { token } }，
      // 我们需要调整。目前假设标准的 { token } 或 { data: { token } }。
      // 假设拦截器直接返回 body。
      
      const token = res.token || res.data?.token; 
      
      if (token) {
        localStorage.setItem('token', token);
        message.success('登录成功');
        navigate('/');
      } else {
         // Fallback if structure is different
         // 如果结构不同则回退
         message.error('登录失败：未收到 Token');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="后台登录" style={{ width: 400 }} bordered={false} className="shadow-lg">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
