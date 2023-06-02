import { DataTypes, Sequelize } from 'sequelize';

/*
 * CREATE TABLE TODO (
    id INT PRIMARY KEY,
    date DATE NOT NULL,
    content VARCHAR(255) NOT NULL
);
*/

export default function (sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('TODO', {
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
    freezeTableName: true,
    timestamps: false,
  });
}