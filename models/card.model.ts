import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/conf';
import { ICard } from '@/types';

export interface CardCreationAttributes extends Optional<ICard, 'id' | 'color' | 'created_at' | 'updated_at'> {}

class Card extends Model<ICard, CardCreationAttributes> implements ICard {
    public id!: string;
    public title!: string;
    public description!: string;
    public list_id!: string;
    public position!: number;
    public color!: string;
    public due_date!: Date;
    public start_date!: Date;
    public tags!: number[];
    public is_archived!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Card.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: '卡片ID',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            },
            comment: '卡片标题',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '卡片描述',
        },
        list_id: {
            type: DataTypes.UUID,
            allowNull: false,
            comment: '列表ID',
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '卡片位置',
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '卡片颜色',
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '截止日期',
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '开始日期',
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
            defaultValue: [],
            validate: {
                isArray: true
            },
            comment: '标签',
        },
        is_archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否归档',
        },
    },
    {
        sequelize,
        modelName: 'Card',
        tableName: 'cards',
        timestamps: true,
        paranoid: false,
        freezeTableName: true,
        underscored: true,
    }
)

export default Card;