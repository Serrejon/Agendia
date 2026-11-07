import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user', 'provider', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        }
    },
    {
        tableName: 'users',
        timestamps: true
    }
)

export default User