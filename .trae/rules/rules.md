# Trae Context Rules

## 1. 技术栈
- **Web/Admin**: React 19, Vite 7, Tailwind 3 (Admin + AntD 6), Axios.
- **Server**: Koa 3, Sequelize 6 (MySQL), ESM.
- **Test**: 无 (引入需确认).

## 2. 核心规范 (Strict)
- **Error**: 禁止 `try-catch`。用 `throw new AppError(code, msg)`。
- **Async**: 禁止 `.then`，强制 `async/await`。
- **Module**: 禁止 `require`，强制 `import`。
- **DB**: 禁止 Raw SQL，强制 Models。
- **React**: 禁止 Class，强制 Hooks。

## 3. 文档规范
- **限制**: 本文 `<1000字`。
- **项目概览**: [project-overview.md](file:///personal-knowledge-blog/.trae/rules/project-overview.md)
- **技术架构**: [tech-architecture.md](file:///personal-knowledge-blog/.trae/rules/tech-architecture.md)
- **数据库**: [database-design.md](file:///personal-knowledge-blog/.trae/rules/database-design.md)
- **API设计**: [api-design.md](file:///personal-knowledge-blog/.trae/rules/api-design.md)
- **代码规范**: [code-rule.md](file:///personal-knowledge-blog/.trae/rules/code-rule.md)
