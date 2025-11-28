import express from 'express';
// @ts-ignore
import cros from 'cros';
import {
  initializeDatabase,
  syncDatabase
} from './models/index';

const app = express();

// app.use(cros()); // 跨域处理
app.use(express.json()); // 解析请求体

// 路由

// 健康检查

// 统一错误处理

// 404处理
// app.use('*', (req, res) => {
//   res.status(404).json({
//     code: 404,
//     message: 'Not Found',
//   });
// });

const startServer = async () => {
  try {
    await initializeDatabase();
    // 2. 同步数据库模型（开发环境）
    if (process.env.NODE_ENV === 'development') {
      await syncDatabase({ alter: true });
    }

    // 3. 启动服务器
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();
