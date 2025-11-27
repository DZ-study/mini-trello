import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'mini_trello',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1qaz2wsx',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
     // 连接池配置
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    
    // 日志配置
    logging: process.env.NODE_ENV === 'development' 
        ? (sql, timing) => console.log(`[SQL] ${sql} | ${timing}ms`)
        : false,
    
    // 定义配置
    define: {
        underscored: true,      // 使用 snake_case 字段名
        timestamps: true,       // 自动管理 createdAt 和 updatedAt
        paranoid: false,        // 不启用软删除
        freezeTableName: true,  // 不使用复数表名
    },
    // 时区配置
    timezone: '+08:00', 
});

export default sequelize;

export const testConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('数据库连接成功');
    } catch (error) {
        console.error('数据库连接测试失败:', error);
    }
}