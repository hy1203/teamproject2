

import { DataTypes, Sequelize } from 'sequelize';
/*
 * CREATE TABLE EMOTION (
    id INT PRIMARY KEY,
    feel VARCHAR(255) NOT NULL
);
*/

export default function (sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('EMOTION', {
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
    freezeTableName: true,
    timestamps: false,
  });
}