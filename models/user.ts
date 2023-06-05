import { DataTypes, Sequelize, Model } from "sequelize";
import { User } from "@/types/models";

export default function User(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
  return sequelize.define<Model<User, Omit<User, "id">>, User>(
    "user",
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
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
