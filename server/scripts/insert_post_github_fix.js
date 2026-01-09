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

        // 1. Get Category "技术复盘" (tech-review)
        const categoryName = '技术复盘';
        const [catRows] = await connection.execute(
            'SELECT id FROM categories WHERE name = ?',
            [categoryName]
        );
        
        let categoryId;
        if (catRows.length > 0) {
            categoryId = catRows[0].id;
        } else {
            console.error(`Category ${categoryName} not found. Please run init script first.`);
            process.exit(1);
        }

        // 2. Get Admin User
        const [userRows] = await connection.execute(
            'SELECT id FROM users WHERE username = ?',
            ['admin']
        );
        
        let authorId;
        if (userRows.length > 0) {
            authorId = userRows[0].id;
        } else {
            console.error('Admin user not found. Please run init script first.');
            process.exit(1);
        }

        // 3. Read Markdown Content
        const mdPath = path.join(__dirname, '../../docs/articles/github-timeout-fix.md');
        const content = await fs.readFile(mdPath, 'utf-8');
        
        // Extract Title and Summary
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : 'GitHub Connection Timeout Fix';
        
        const summary = '解决云服务器 git push 报错 Failed to connect to github.com port 443 的问题。分析原因并提供切换 SSH 协议的详细步骤。';

        // 4. Insert/Update Article
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
                    author_id = ?,
                    status = 1, 
                    updated_at = NOW() 
                WHERE id = ?`,
                [content, summary, categoryId, authorId, existing[0].id]
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
