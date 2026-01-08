### 1. 项目使用的框架版本及依赖
- 前端 (client-blog / client-admin) :
  - 核心 : React ^19.2.0 (Hooks), Vite ^7.2.4 .
  - 样式 : TailwindCSS ^3.4.19 . (Admin 端额外集成 Ant Design ^6.1.4 ).
  - HTTP : Axios ^1.13.2 .
- 后端 (server) :
  - 核心 : Koa ^3.1.1 , Koa-Router ^14.0.0 .
  - 数据库 : Sequelize ^6.37.7 (ORM), MySQL2 ^3.16.0 .
  - 模块系统 : 全项目强制使用 ES Modules ( type: "module" ).
### 2. 测试框架的详细要求
- 现状 : 当前项目 package.json 中 未集成 任何测试框架 (如 Jest, Vitest, Mocha)，且 test 脚本为空。
- 规范 : 暂无强制测试要求。若需编写测试，需先经用户确认引入测试基础设施（推荐 Vitest 用于前端，Jest/Mocha 用于后端）。
### 3. 禁止使用的 API 与模式
- 流程控制 :
  - 禁止在 Controller 层对每个 Handler 单独使用 try-catch 。必须抛出自定义错误（如 throw new AppError(...) ），由全局 Error Middleware 统一捕获。
  - 禁止使用 Promise 链式调用 ( .then().catch() )， 必须 使用 async/await 。
- 模块导入 :
  - 禁止使用 CommonJS ( require / module.exports )，必须使用 ESM ( import / export )。
- 数据库 :
  - 禁止直接编写 Raw SQL 查询，必须优先使用 Sequelize 模型方法操作数据。
- 代码风格 :
  - 禁止在 Class 组件中编写 React 代码，必须使用 Functional Components + Hooks。