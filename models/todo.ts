import { DataTypes, Sequelize } from 'sequelize';

export default function todo(sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('todo', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'todo',
    freezeTableName: true,
    timestamps: false,
  });
}