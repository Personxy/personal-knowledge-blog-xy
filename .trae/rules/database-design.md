# Database Usage Rules (MySQL)

## 1. 命名规范
- **Table**: 复数, snake_case (e.g. `users`, `article_tags`).
- **Column**: snake_case (e.g. `created_at`, `view_count`).
- **Index**: `idx_tablename_column` / `uq_tablename_column`.

## 2. 字段规范
- **PK**: 必须有 `id` (INT/BIGINT AI).
- **Time**: 必须有 `created_at`, `updated_at` (DATETIME).
- **Charset**: 强制 `utf8mb4` (支持 Emoji).
- **Boolean**: 使用 `TINYINT(1)` (0/1).
- **Soft Delete**: 需要时使用 `deleted_at`.

## 3. 开发规范
- **ORM**: 强制使用 Sequelize Models, 禁止 Raw SQL (除非性能瓶颈).
- **Migration**: 结构变更必须通过 Migration 脚本.
- **Constraints**: 关键外键必须在 DB 层建立约束.
