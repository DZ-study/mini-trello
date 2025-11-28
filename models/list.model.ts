import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/conf';
import { IList } from '@/types';

export interface ListCreationAttributes extends Optional<IList, 'id' | 'color' | 'created_at' | 'updated_at'> {}

class List extends Model<IList, ListCreationAttributes> implements IList {
    public id!: string;
    public title!: string;
    public description!: string;
    public board_id!: string;
    public position!: number;
    public color!: string;
    public sort_type!: 1 | 2 | 3 | 4;
    public is_archived!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

List.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: '列表ID',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            },
            comment: '列表标题',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '列表描述',
        },
        board_id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '面板ID',
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '列表位置',
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '列表颜色',
        },
        sort_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4]],
            },
            comment: '排序依据',
        },
        is_archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否归档',
        }
    },
    {
        sequelize,
        modelName: 'List',
        tableName: 'lists',
        timestamps: true,
        paranoid: false,
        freezeTableName: true,
        underscored: true,
    }
)

export default List;