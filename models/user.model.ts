import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/conf';
import { IUser } from '@/types';

// ! 定义用户创建属性，User.create时，不需要传可选字段
export interface UserCreationAttributes extends Optional<IUser, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  // ! 非空断言
  public id!: string;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: '用户ID',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 30],
      },
      comment: '用户姓名',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 唯一约束
      validate: {
        notEmpty: true, // 非空约束
        isEmail: true, // 邮箱格式约束
      },
      comment: '用户邮箱',
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // 非空约束
        len: [8, 30], // 密码长度约束
      },
      comment: '密码哈希',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // 自动管理 createdAt 和 updatedAt
    paranoid: false, // 不启用软删除：不会真正删除数据
    freezeTableName: true, // 不使用复数表名
    underscored: true, // 使用 snake_case 字段名
    createdAt: 'created_at', // 创建时间字段名
    updatedAt: 'updated_at', // 更新时间字段名
  }
);

export default User;
