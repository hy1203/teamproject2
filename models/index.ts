
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configs from "@/config";
import User from "./user";


const env = process.env.NODE_ENV || "development";
const { database, username, password, ...config } = configs[env];
const sequelize = new Sequelize(
  database,
  username,
  password,
  config
);

const user = User(sequelize, DataTypes);

interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  user: typeof user;
}

export default <DB>{
  sequelize,
  Sequelize,
  user,
};
