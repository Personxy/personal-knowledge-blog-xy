import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>欢迎来到管理后台</Title>
      <Paragraph>
        在这里你可以管理你的博客文章、分类和标签。
      </Paragraph>
    </div>
  );
};

export default Dashboard;
