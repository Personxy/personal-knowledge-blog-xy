import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ArticleList from '../pages/ArticleList';
import AdminLayout from '../layout/AdminLayout';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
      {
        path: 'articles/create',
        element: <div>Create Article Page (To Be Implemented)</div>,
      },
      {
        path: 'articles/edit/:id',
        element: <div>Edit Article Page (To Be Implemented)</div>,
      },
    ],
  },
]);

export default router;
