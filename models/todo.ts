import { DataTypes, Sequelize } from 'sequelize';

export default function todo(sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('todo', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: dataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    tableName: 'todo',
    freezeTableName: true,
    timestamps: false,
  });
}
