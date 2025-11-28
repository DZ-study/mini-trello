export interface IUser {
    id: string; // 用户ID
    email: string; // 邮箱
    name: string; // 姓名
    password_hash: string; // 密码哈希
    created_at?: Date;
    updated_at?: Date;
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

export interface IBoard {
    id: string;
    title: string;
    description: string;
    color: string;
    user_id: string;
    view: 1 | 2 | 3 | 4 | 5; // 1: 面板视图, 2: 表格视图, 3: 日历视图, 4: 仪表盘, 5: 时间线
    created_at?: Date;
    updated_at?: Date;
}

export interface IList {
    id: string;
    title: string;
    description: string;
    board_id: string;
    position: number; // 列表位置
    color: string; // 列表颜色
    sort_type: 1 | 2 | 3 | 4; // 1: 名称, 2: 创建时间, 3: 更新时间, 4: 截止日期
    is_archived: boolean; // 是否归档
    created_at?: Date;
    updated_at?: Date;
}

export interface ICard {
    id: string;
    title: string;
    description: string;
    list_id: string;
    position: number; // 卡片位置
    color: string; // 卡片颜色
    due_date: Date; // 截止日期
    start_date: Date; // 开始日期
    tags: number[]; // 标签
    is_archived: boolean; // 是否归档
    created_at?: Date;
    updated_at?: Date;
}