import { DataTypes, Sequelize } from "sequelize";

export default function diary(sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define(
    "diary",
    {
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
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      tableName: "diary",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
