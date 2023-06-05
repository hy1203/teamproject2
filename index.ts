import process from "process";
import Express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import route from "@/routes";
import db from "@/models";

const env = process.env.NODE_ENV || "development";
const express = require("express");
const app = Express();
const PORT = 8000;
var path = require("path");

env === "development" &&
  (async () => {
    // if db exists, drop it and create new one.
    let schemas = await db.sequelize.showAllSchemas({});
    console.log("schemas", schemas);
    ["comment", "todo", "diary", "user", "emotion"].forEach(async (table) => {
      await db.sequelize.dropSchema(table, {});
    });
    console.log("drop schema");
    schemas = await db.sequelize.showAllSchemas({});
    console.log("schemas", schemas);
    await db.sequelize.sync();
    schemas = await db.sequelize.showAllSchemas({});
    console.log("schemas", schemas);
  })();

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(Express.static("views"));

app.use("/public", express.static(__dirname + "/public"));
app.use("/image", express.static(__dirname + "/image"));

// 정적 파일 제공
app.set("public", __dirname + "/public");

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use("/", route);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
