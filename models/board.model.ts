import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/conf';
import { IBoard } from '@/types';

export interface BoardCreationAttributes extends Optional<IBoard, 'id' | 'color' | 'created_at' | 'updated_at'> {}

class Board extends Model<IBoard, BoardCreationAttributes> implements IBoard {
    public id!: string;
    public title!: string;
    public description!: string;
    public color!: string;
    public user_id!: string;
    public view!: 1 | 2 | 3 | 4 | 5;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Board.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: '面板ID',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            },
            comment: '面板标题',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '面板描述',
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '面板颜色',
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '用户ID',
        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4, 5]],
            },
            comment: '面板视图',
        },
    },
    {
        sequelize,
        modelName: 'Board',
        tableName: 'boards',
        timestamps: true,
        paranoid: false,
        freezeTableName: true,
        underscored: true,
    }
)

export default Board;