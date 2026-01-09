import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getArticles, deleteArticle } from '../services/article';
import { useNavigate } from 'react-router-dom';

const ArticleList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const navigate = useNavigate();

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await getArticles({ page, pageSize });
      // Adjust based on actual API response structure
      // Assuming { items: [], total: 100 } or { data: [], meta: { total: 100 } }
      const list = res.items || res.data || [];
      const total = res.total || res.meta?.total || 0;
      
      setData(list);
      setPagination({ ...pagination, current: page, pageSize, total });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure delete this article?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteArticle(id);
          message.success('Article deleted successfully');
          fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat) => cat?.name || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'orange'}>
          {status === 1 ? 'Published' : 'Draft'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => navigate(`/articles/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    fetchData(newPagination.current, newPagination.pageSize);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Articles</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => navigate('/articles/create')}
        >
          New Article
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ArticleList;
