## 3. 文档维护
- **强制规则**: 任何 API 接口的增删改（包括 URL、Method、Params、Response），**必须同步更新** 根目录下的 `API_DOCUMENTATION.md` 文件。
- **目标**: `API_DOCUMENTATION.md` 是前后端协作的唯一真理来源。

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