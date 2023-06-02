import { DataTypes, Sequelize } from 'sequelize';

/**
 * CREATE TABLE DIARY (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL
);
*/
export default function (sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('DIARY', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'DIARY',
    timestamps: false,
  });
}
