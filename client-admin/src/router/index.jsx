import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ArticleList from '../pages/ArticleList';
import AdminLayout from '../layout/AdminLayout';
import PrivateRoute from '../components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'articles',
        element: <ArticleList />,
      },
      // Placeholder for create/edit
      // 创建/编辑页面的占位符
      {
        path: 'articles/create',
        element: <div>创建文章页面（待实现）</div>,
      },
      {
        path: 'articles/edit/:id',
        element: <div>编辑文章页面（待实现）</div>,
      },
    ],
  },
]);

export default router;
