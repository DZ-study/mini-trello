import { Pool, PoolConfig } from 'pg'

// 数据库配置
const dbConfig: PoolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1qaz2wsx',
    // TODO: 数据库名需要修改
    database: process.env.DB_NAME || 'mini_trello',

    // 连接池配置
    max: Number(process.env.DB_MAX_CONNECTIONS) || 10,
    idleTimeoutMillis: 30000, // 连接空闲超时时间
    connectionTimeoutMillis: 2000, // 连接超时时间
    maxUses: 7500, // 单个连接最大使用次数（预防内存泄漏）
}

export const pool = new Pool(dbConfig);

export const testConnection = async (): Promise<boolean> => {
    try {
        const client = await pool.connect();
        console.log('数据库连接成功');
        client.release();
        return true;
    } catch (error) {
        console.error('数据库连接测试失败:', error);
        return false;
    }
}