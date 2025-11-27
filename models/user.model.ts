import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@/db/conf';
import { IUser } from '@/types';

export interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
export default User;
