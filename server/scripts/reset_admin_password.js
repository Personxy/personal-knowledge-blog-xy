import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'knowledge_blog',
    port: process.env.DB_PORT || 3306
};

async function main() {
    try {
        const connection = await mysql.createConnection(config);
        
        const password = 'admin'; // Default password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await connection.execute(
            'UPDATE users SET password = ? WHERE username = ?',
            [hashedPassword, 'admin']
        );
        
        console.log('Admin password reset to: admin');
        await connection.end();
    } catch (error) {
        console.error(error);
    }
}

main();
