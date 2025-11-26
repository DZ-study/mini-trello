import express from 'express';
import cros from 'cros'

const app = express();

app.use(cros()); // 跨域处理
app.use(express.json()); // 解析请求体

// 路由

// 健康检查

// 统一错误处理

// 404处理
app.use('*', (req, res) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found',
    })
})