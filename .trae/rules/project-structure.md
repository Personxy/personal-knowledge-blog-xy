# 6. 项目目录结构规划

```
project-root/
├── client-blog/          # 前台展示项目 (React + Vite)
│   ├── src/
│   │   ├── components/   # 公共组件 (Header, Footer, ArticleCard)
│   │   ├── pages/        # 页面 (Home, ArticleDetail, About)
│   │   ├── services/     # API 请求封装
│   │   └── styles/       # 全局样式 (Tailwind)
│   └── ...
│
├── client-admin/         # 后台管理项目 (React + Vite + AntD)
│   ├── src/
│   │   ├── layout/       # Admin 布局
│   │   ├── pages/        # 管理页面 (ArticleList, Editor)
│   │   └── ...
│   └── ...
│
└── server/               # 后端服务 (Koa)
    ├── src/
    │   ├── config/       # 数据库配置, 常量
    │   ├── controllers/  # 业务逻辑
    │   ├── models/       # Sequelize 模型
    │   ├── routes/       # 路由定义
    │   ├── middlewares/  # 中间件 (Auth, ErrorHandle)
    │   └── utils/        # 工具函数 (Logger, JWT)
    ├── uploads/          # 静态资源上传目录
    └── app.js            # 入口文件
```

---