# 后端开发规范文档 (Server Development Standards)

本文档旨在统一 `personal-knowledge-blog/server` 项目的开发规范，确保代码风格一致、易于维护和扩展。

## 1. 技术栈与环境
- **Runtime**: Node.js (v20+)
- **Module System**: ES Modules (`import`/`export`)
- **Framework**: Koa 2
- **Database**: MySQL 8
- **ORM**: Sequelize 6+
- **Package Manager**: npm

## 2. 目录结构规范
```
server/
├── src/
│   ├── config/          # 配置文件 (数据库连接, 环境变量读取)
│   ├── constants/       # 常量定义 (错误码, 默认值)
│   ├── controllers/     # 控制层 (处理请求参数, 调用 Service, 返回响应)
│   ├── middlewares/     # 中间件 (Auth, ErrorHandler, Logger)
│   ├── models/          # Sequelize 模型定义
│   ├── routes/          # 路由定义 (URL -> Controller)
│   ├── services/        # 业务逻辑层 (复杂的业务处理, 数据库操作)
│   ├── utils/           # 工具函数 (JWT, 密码加密, 格式化)
│   └── app.js           # 应用入口
├── .env                 # 环境变量 (不要提交到 Git)
├── .env.example         # 环境变量示例
├── package.json
└── README.md
```

## 3. 命名规范

### 3.1 文件与目录
- **目录**: `kebab-case` (例如: `user-roles`)
- **文件**: `camelCase` (例如: `userController.js`, `authMiddleware.js`)
- **类/模型文件**: `PascalCase` (例如: `User.js`, `Article.js`)

### 3.2 代码命名
- **变量/函数**: `camelCase` (例如: `getUserById`, `isPublished`)
- **常量**: `UPPER_SNAKE_CASE` (例如: `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`)
- **类 (Class)**: `PascalCase` (例如: `UserService`, `AuthError`)
- **数据库表名**: `snake_case` + 复数 (例如: `users`, `article_tags`)
- **数据库字段**: `snake_case` (例如: `created_at`, `user_id`)

## 4. 代码风格规范 (Style Guide)

### 4.1 异步处理
- 必须使用 `async`/`await`，避免回调地狱。
- 所有的 Controller 方法必须是 `async` 的。

### 4.2 模块导入/导出
- 使用 ES Modules 语法。
- 导出时推荐使用 `export default` (对于单一职责模块) 或 `export const` (对于工具库)。

### 4.3 错误处理
- **禁止** 在 Controller 中随意使用 `try-catch` 吞掉错误而不处理。
- 推荐将错误抛出，由全局错误处理中间件 (`errorHandler`) 统一捕获并格式化响应。
- 使用自定义错误类 (继承自 `Error`) 来区分业务错误 (如 400, 401, 403)。

### 4.4 注释
- **函数/方法**: 必须包含 JSDoc 风格注释，说明参数类型和返回值。
- **复杂逻辑**: 必须在关键步骤添加单行注释 `//`。

## 5. API 接口规范

### 5.1 响应格式
所有 API 必须返回统一的 JSON 格式：

```json
{
  "code": 0,          // 业务状态码 (0 表示成功, 非 0 表示失败)
  "message": "success", // 提示信息
  "data": { ... }     // 业务数据
}
```

### 5.2 常用状态码 (HTTP Status)
- `200 OK`: 请求成功
- `201 Created`: 创建成功
- `400 Bad Request`: 参数错误
- `401 Unauthorized`: 未登录或 Token 过期
- `403 Forbidden`: 无权限
- `404 Not Found`: 资源不存在
- `500 Internal Server Error`: 服务器内部错误

## 6. Git 提交规范
遵循 **Conventional Commits** 规范：
`type(scope): description`

- **feat**: 新功能
- **fix**: 修复 Bug
- **docs**: 文档变更
- **style**: 代码格式调整 (不影响逻辑)
- **refactor**: 重构 (无新功能, 无 Bug 修复)
- **chore**: 构建过程或辅助工具变动

示例: 
- `feat(user): add login api`
- `fix(article): fix title validation error`
