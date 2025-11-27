export interface IUser {
    id: string; // 用户ID
    email: string; // 邮箱
    name: string; // 姓名
    password_hash: string; // 密码哈希
    created_at?: string; //TODO
    updated_at?: string; //TODO
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
    }
}

export interface AoiResponse<T = any> {
    code: number;
    message: string;
    data?: T;
    error?: string;
}