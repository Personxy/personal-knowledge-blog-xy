# 个人知识博客系统 (Personal Knowledge Blog) 开发文档

## 1. 项目概述

### 1.1 项目简介
本项目旨在构建一个现代化的个人知识博客系统，用于记录和沉淀面试题、技术总结、个人感悟及生活随笔。系统采用完全前后端分离的架构，前台用于公开展示，后台用于管理员（博主）内容管理。

### 1.2 核心目标
- **知识沉淀**：分类管理技术与生活内容。
- **现代化体验**：提供流畅、美观的阅读与管理体验。
- **易扩展性**：架构设计需考虑未来功能扩展（如评论、搜索、统计）。

---

## 2. 技术架构

### 2.1 总体架构
采用 **Client-Server** 架构，前后端完全分离。
- **Frontend (Web)**: 博客前台展示，面向访客。
- **Frontend (Admin)**: 后台管理系统，面向管理员。
- **Backend (API)**: 提供统一的 RESTful API 服务。

### 2.2 技术栈详细说明

#### 前台展示 (Blog Client)
- **框架**: React 18 (Functional Components + Hooks)
- **构建工具**: Vite
- **路由**: React Router v6
- **状态管理**: Context API + Hooks (初期), Zustand/Recoil (后期按需)
- **UI 库**: Tailwind CSS (核心) + Headless UI (组件逻辑)
  - *选择理由*: Tailwind CSS 提供极高的定制自由度，易于实现现代化独特设计。
- **HTTP 请求**: Axios
- **Markdown 渲染**: react-markdown + prismjs (代码高亮) + remark-gfm

#### 后台管理 (Blog Admin)
- **框架**: React 18
- **构建工具**: Vite
- **UI 库**: Ant Design 5.x (推荐)
  - *选择理由*: 成熟的 B 端组件库，Form 表单与 Table 表格功能强大，开发效率高。
- **表单管理**: Ant Design Form
- **权限控制**: JWT (存储于 LocalStorage/Cookie)
- **富文本/Markdown 编辑器**: ByteMD 或 MdEditor

#### 后端服务 (Server)
- **Runtime**: Node.js
- **Web 框架**: Koa 2
- **数据库**: MySQL 8
- **ORM**: Sequelize (推荐) 或 TypeORM
- **鉴权**: jsonwebtoken (JWT)
- **日志**: Winston + winston-daily-rotate-file
- **进程管理**: PM2

#### 部署与运维
- **服务器**: Ubuntu Linux
- **反向代理**: Nginx
- **CI/CD**: GitHub Actions (可选)

---

## 3. UI/UX 现代化设计指南

为了达成“现代化”的视觉效果，我们将遵循以下设计原则：

### 3.1 核心风格：**Clean & Airy (洁净与通透)**
- **排版 (Typography)**: 
  - 使用大字号标题，增加行高，提升阅读舒适度。
  - 字体推荐：Inter, Roboto, 或系统默认 sans-serif 字体栈。
- **色彩 (Color Palette)**:
  - **主色调**: 选取一种高饱和度的品牌色（如电光紫、深海蓝或活力橙）作为点缀。
  - **背景色**: 避免纯白 (#FFFFFF)，使用灰白 (#F8F9FA) 或 暖白 (#FEFEFE) 降低视觉疲劳。
  - **暗黑模式**: 必须支持。深灰背景 (#121212) 搭配低饱和度文字。
- **卡片式设计 (Card UI)**:
  - 文章列表采用卡片布局。
  - **微阴影**: 使用柔和的、扩散范围大的阴影 (`box-shadow: 0 4px 20px rgba(0,0,0,0.05)`)，营造悬浮感。
  - **圆角**: 较大的圆角 (12px - 16px) 显得更亲和。

### 3.2 交互体验
- **微交互 (Micro-interactions)**: 
  - 按钮 Hover 时的轻微上浮和阴影加深。
  - 页面切换时的淡入淡出 (Fade) 或 滑动 (Slide) 转场。
- **骨架屏 (Skeleton Loading)**: 数据加载时展示骨架屏，而非简单的 Loading 转圈。
- **响应式 (Responsive)**: 完美适配 Mobile, Tablet, Desktop。

### 3.3 布局参考
- **首页**: 
  - 顶部：极简导航栏（Logo + 导航链接 + 搜索图标）。
  - Hero Section：一句话自我介绍或最新/置顶文章的大图展示。
  - 内容区：瀑布流或网格布局展示文章卡片。
- **文章详情页**:
  - 沉浸式阅读体验：隐藏侧边栏，内容居中，最大宽度限制 (max-width: 768px)。
  - 右下角：悬浮目录 (TOC) 按钮和回到顶部按钮。

---

## 4. 数据库设计 (MySQL)

### 4.1 ER 图概念
主要包含 `Users` (用户), `Articles` (文章), `Categories` (分类), `Tags` (标签) 四个核心实体。

### 4.2 表结构定义

#### users (管理员表)
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | INT (PK) | 自增主键 |
| username | VARCHAR(50) | 用户名 |
| password | VARCHAR(255) | 加密后的密码 |
| nickname | VARCHAR(50) | 昵称 |
| avatar | VARCHAR(255) | 头像 URL |

#### categories (分类表)
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | INT (PK) | 自增主键 |
| name | VARCHAR(50) | 分类名 (如: 面试题, 技术总结) |
| code | VARCHAR(50) | 英文标识 (用于路由, 如: interview) |

#### articles (文章表)
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | INT (PK) | 自增主键 |
| title | VARCHAR(255) | 文章标题 |
| summary | VARCHAR(500) | 文章摘要 |
| content | TEXT / LONGTEXT | Markdown 原始内容 |
| cover_image | VARCHAR(255) | 封面图片 URL |
| view_count | INT | 阅读量 |
| status | TINYINT | 0: 草稿, 1: 发布 |
| category_id | INT (FK) | 关联分类 ID |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### tags (标签表)
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | INT (PK) | 自增主键 |
| name | VARCHAR(50) | 标签名 |

#### article_tags (文章-标签关联表)
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| article_id | INT (FK) | 文章 ID |
| tag_id | INT (FK) | 标签 ID |

---

## 5. API 接口设计 (RESTful)

### 5.1 通用前缀
`/api/v1`

### 5.2 认证模块 (Auth)
- `POST /auth/login`: 管理员登录，返回 Token。
- `GET /auth/info`: 获取当前用户信息 (需鉴权)。

### 5.3 文章模块 (Articles)
- `GET /articles`: 获取文章列表 (分页, 筛选: category, tag)。
- `GET /articles/:id`: 获取文章详情 (并增加阅读量)。
- `POST /articles`: 创建文章 (需鉴权)。
- `PUT /articles/:id`: 更新文章 (需鉴权)。
- `DELETE /articles/:id`: 删除文章 (需鉴权)。

### 5.4 分类与标签 (Categories & Tags)
- `GET /categories`: 获取所有分类。
- `GET /tags`: 获取所有标签。
- `POST /categories`: 创建分类 (需鉴权)。
- `POST /tags`: 创建标签 (需鉴权)。

### 5.5 上传模块 (Upload)
- `POST /upload`: 图片上传，返回静态资源 URL (需鉴权)。

---

## 6. 项目目录结构规划

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
