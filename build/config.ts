import fs from "fs";
import path from "path";
import crpyto from "crypto";
import { DBConfig } from "@/types/config";

function setDbConfig(dbConfig: string, db: DBConfig) {
  const host = `${db.dialect}://${db.username}:${db.password}@${db.host}?ssl={"rejectUnauthorized":true}`;
  const prodDbConfig = JSON.stringify({
    username: db.username,
    password: db.password,
    database: db.database,
    host: host,
    dialect: db.dialect,
    logging: false,
  });

  fs.writeFile(
    dbConfig,
    `import DBConfigs from "@/types/config";export default<DBConfigs>{production:${prodDbConfig}};`,
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

export default async function setConfig(configDir: string, db: DBConfig) {
  // create config directory
  fs.mkdirSync(configDir, { recursive: true });
  const dbConfig = path.resolve(configDir, "index.ts");
  const tokenConfig = path.resolve(configDir, "token.ts");

  setDbConfig(dbConfig, db);
  setTokenConfig(tokenConfig);
}
