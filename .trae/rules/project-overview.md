# 项目概览 & 路线图

## 1. 概述
构建现代化个人知识博客系统 (Web + Admin + Server API)。
- **Core**: 前台展示 + 后台管理 + RESTful API。
- **Goals**: 知识沉淀、现代化体验、易扩展。



## 7. 开发路线图 (Roadmap)

### Phase 1: 基础建设 & 后端 API
1. 初始化 Git 仓库与 Monorepo 结构 (可选) 或 独立仓库。
2. 搭建 Koa 服务器，配置 MySQL 连接 (Sequelize)。
3. 实现 JWT 登录鉴权接口。
4. 完成文章、分类 CRUD 接口。

### Phase 2: 后台管理系统 (Admin)
1. 搭建 React + Ant Design 框架。
2. 实现登录页面与 Token 处理。
3. 集成 Markdown 编辑器，实现文章撰写与发布功能。
4. 文章列表管理 (分页、搜索、删除)。

### Phase 3: 前台展示系统 (Blog)
1. 搭建 React + Tailwind CSS 框架。
2. 设计并实现首页、文章详情页 UI。
3. 对接后端 API 展示数据。
4. 实现 Markdown 渲染与代码高亮。

### Phase 4: 部署与优化
1. 配置 Nginx 反向代理。
2. 使用 PM2 守护 Node.js 进程。
3. 生产环境构建前端资源。
4. SEO 优化 (Meta 标签) 与 性能优化 (Gzip, CDN)。

---