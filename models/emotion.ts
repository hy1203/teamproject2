

import { DataTypes, Sequelize } from 'sequelize';

export default function emotion(sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('emotion', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    feel: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'emotion',
    freezeTableName: true,
    timestamps: false,
  });
}