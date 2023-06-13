import fs from "fs";
import path from "path";
import crpyto from "crypto";
import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();
const DIALECT = process.env.DB_DIALECT as Dialect;
const dbConfigs = {
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: DIALECT,
    logging: false,
  },
  development: {
    username: process.env.DEV_DB_USERNAME!,
    password: process.env.DEV_DB_PASSWORD!,
    database: process.env.DEV_DB_DATABASE!,
    host: process.env.DEV_DB_HOST!,
    dialect: DIALECT,
    logging: false,
  },
  test: {
    username: process.env.TEST_DB_USERNAME!,
    password: process.env.TEST_DB_PASSWORD!,
    database: process.env.TEST_DB_DATABASE!,
    host: process.env.TEST_DB_HOST!,
    dialect: DIALECT,
    logging: false,
  },
};

function setDbConfig(dbConfig: string) {
  const dbConfigString = JSON.stringify(dbConfigs);
  fs.writeFile(
    dbConfig,
    `import DBConfigs from "@/types/config";export default<DBConfigs>${dbConfigString};`,
    "utf-8",
    (err) => {
      if (err) console.log(err);
    }
  );
}

function setTokenConfig(tokenConfig: string) {
  const ACCESS_TOKEN = crpyto.randomBytes(64).toString("hex");
  const REFRESH_TOKEN = crpyto.randomBytes(64).toString("hex");
  fs.writeFile(
    tokenConfig,
    `export default {ACCESS_TOKEN: "${ACCESS_TOKEN}",REFRESH_TOKEN: "${REFRESH_TOKEN}"};`,
    "utf-8",
    (err) => {
      if (err) console.log(err);
    }
  );
}

export default async function setConfig(configDir: string) {
  // create config directory
  fs.mkdirSync(configDir, { recursive: true });
  const dbConfig = path.resolve(configDir, "index.ts");
  const tokenConfig = path.resolve(configDir, "token.ts");

  setDbConfig(dbConfig);
  setTokenConfig(tokenConfig);
}
