import React from 'react';
import { Navigate } from 'react-router-dom';

// 路由守卫组件：用于保护需要登录才能访问的路由
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // 如果没有 Token，重定向到登录页面
    return <Navigate to="/login" replace />;
  }
  // 如果有 Token，正常渲染子组件
  return children;
};

export default PrivateRoute;
