import { DataTypes, Sequelize } from 'sequelize';

export default function User(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            username: {
                type: dataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                type: dataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return User;
}
