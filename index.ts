import Express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import route from "@/routes";
import db from "@/models";

const app = Express();
const PORT = 8000;
var path = require("path");

db.sequelize.sync();

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
