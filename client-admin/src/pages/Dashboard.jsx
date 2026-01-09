import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>Welcome to Admin Dashboard</Title>
      <Paragraph>
        Here you can manage your blog articles, categories, and tags.
      </Paragraph>
    </div>
  );
};

export default Dashboard;
