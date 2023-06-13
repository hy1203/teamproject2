import path from "path";
import process from "process";
import dotenv from "dotenv";
import setConfig from "./config";
import { Dialect } from "sequelize";

dotenv.config();
const root = path.resolve(__dirname, "../");
const configDir = path.resolve(root, "config");

// db config

const db = {
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  host: process.env.DB_HOST!,
  dialect: process.env.DB_DIALECT as Dialect,
  logging: false,
};

setConfig(configDir, db);
