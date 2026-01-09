import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Setup dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from server root
dotenv.config({ path: path.join(__dirname, '../.env') });

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'knowledge_blog',
    port: process.env.DB_PORT || 3306
};

async function main() {
    let connection;
    try {
        console.log('Connecting to database...');
        connection = await mysql.createConnection(config);
        console.log('Connected.');

        // 1. Ensure Category "技术复盘" (Technical Review) exists
        const categoryName = '技术复盘';
        const categoryCode = 'tech-review';
        
        const [rows] = await connection.execute(
            'SELECT id FROM categories WHERE name = ?',
            [categoryName]
        );

        let categoryId;
        if (rows.length > 0) {
            categoryId = rows[0].id;
            console.log(`Category "${categoryName}" exists (ID: ${categoryId}).`);
        } else {
            const [result] = await connection.execute(
                'INSERT INTO categories (name, code, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
                [categoryName, categoryCode]
            );
            categoryId = result.insertId;
            console.log(`Created category "${categoryName}" (ID: ${categoryId}).`);
        }

        // 1.5 Ensure Author (Admin User) exists
        const username = 'admin';
        const [userRows] = await connection.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        let authorId;
        if (userRows.length > 0) {
            authorId = userRows[0].id;
            console.log(`User "${username}" exists (ID: ${authorId}).`);
        } else {
            // Create a dummy admin user
            // Password should be hashed in real app, using a placeholder here
            const [userResult] = await connection.execute(
                'INSERT INTO users (username, password, nickname, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
                [username, '$2a$10$YourHashedPasswordHere...', 'Admin']
            );
            authorId = userResult.insertId;
            console.log(`Created user "${username}" (ID: ${authorId}).`);
        }

        // 2. Read Markdown Content
        const mdPath = path.join(__dirname, '../../docs/articles/trae-remote-crash-fix.md');
        const content = await fs.readFile(mdPath, 'utf-8');
        
        // Extract Title and Summary (Simple parsing)
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : 'Trae Remote Connection Issue';
        
        // Simple summary extraction (first paragraph after title)
        // Or hardcode it as defined in previous plan
        const summary = '记录一次因使用 Trae 远程开发导致 2GB 内存服务器资源耗尽、死机的排查过程。通过添加 Swap 分区和优化 swappiness 参数成功解决。';

        // 3. Insert Article
        // Check if article with same title exists to avoid duplicates
        const [existing] = await connection.execute(
            'SELECT id FROM articles WHERE title = ?',
            [title]
        );

        if (existing.length > 0) {
            console.log('Article already exists. Updating...');
            await connection.execute(
                `UPDATE articles SET 
                    content = ?, 
                    summary = ?, 
                    category_id = ?, 
                    status = 1, 
                    updated_at = NOW() 
                WHERE id = ?`,
                [content, summary, categoryId, existing[0].id]
            );
            console.log(`Article updated (ID: ${existing[0].id}).`);
        } else {
            console.log('Inserting new article...');
            const [res] = await connection.execute(
                `INSERT INTO articles 
                (title, summary, content, category_id, author_id, status, created_at, updated_at, view_count) 
                VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW(), 0)`,
                [title, summary, content, categoryId, authorId]
            );
            console.log(`Article created (ID: ${res.insertId}).`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

main();
