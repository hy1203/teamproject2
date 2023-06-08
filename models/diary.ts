import { DataTypes, Sequelize, Model } from "sequelize";
import { Diary } from "@/types/models";

export default function diary(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
  return sequelize.define<Model<Diary, Omit<Diary, "id">>, Diary>(
    "diary",
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
