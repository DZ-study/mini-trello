// src/models/index.ts
import sequelize from '../db/conf';
import { IUser, IBoard, IList, ICard } from '@/types';

// 导入所有模型
import User, { UserCreationAttributes } from './user.model';
import Board, { BoardCreationAttributes } from './board.model';
import List, { ListCreationAttributes } from './list.model';
import Card, { CardCreationAttributes } from './card.model';

/**
 * 数据库模型关联关系集中管理
 * 这里定义所有模型之间的关联关系，避免循环依赖
 */

// ==================== 关联关系定义 ====================

// 1. 用户 ↔ 看板 (一对多)
User.hasMany(Board, {
  foreignKey: 'user_id',
  as: 'boards',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Board.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// 2. 看板 ↔ 列表 (一对多)
Board.hasMany(List, {
  foreignKey: 'board_id',
  as: 'lists',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

List.belongsTo(Board, {
  foreignKey: 'board_id',
  as: 'board',
});

// 3. 列表 ↔ 卡片 (一对多)
List.hasMany(Card, {
  foreignKey: 'list_id',
  as: 'cards',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Card.belongsTo(List, {
  foreignKey: 'list_id',
  as: 'list',
});

// ==================== 导出类型定义 ====================

// 导出所有属性接口
export type {
  IUser as UserAttributes,
  UserCreationAttributes,
  IBoard as BoardAttributes, 
  BoardCreationAttributes,
  IList as ListAttributes,
  ListCreationAttributes,
  ICard as CardAttributes,
  CardCreationAttributes,
};

// ==================== 导出模型实例 ====================

// 导出模型类
export { User, Board, List, Card };

// 导出 sequelize 实例
export { sequelize };

// ==================== 数据库操作函数 ====================

/**
 * 初始化数据库连接并测试
 */
export const initializeDatabase = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('✅ 数据库连接成功');
    return true;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    return false;
  }
};

/**
 * 同步数据库模型
 * @param options 同步选项
 */
export const syncDatabase = async (options: { 
  force?: boolean; 
  alter?: boolean 
} = {}): Promise<void> => {
  try {
    const { force = false, alter = true } = options;
    
    if (force) {
      console.log('⚠️  强制模式: 将删除所有数据并重新建表');
    }
    
    await sequelize.sync({ force, alter });
    console.log('✅ 数据库表同步完成');
    
    // 显示创建的表
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📊 数据库中的表:');
    (tables as any[]).forEach((table: any) => {
      console.log(`   - ${table.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ 数据库同步失败:', error);
    throw error;
  }
};

/**
 * 关闭数据库连接
 */
export const closeDatabase = async (): Promise<void> => {
  await sequelize.close();
  console.log('🔒 数据库连接已关闭');
};

// ==================== 默认导出 ====================

export default {
  // 模型
  User,
  Board, 
  List,
  Card,
  
  // 数据库实例
  sequelize,
  
  // 函数
  initializeDatabase,
  syncDatabase,
  closeDatabase,
};