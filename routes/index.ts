import { Router } from "express";
import controller from "@/controller";
import diary from "./diary";
import todo from "./todo";
import emotion from "./emotion";

const route = Router();

// index route
route.get("/", controller.index);

// login route
route.get("/login", controller.loginPage);
route.post("/login", controller.login);
// logout route
route.get("/logout", controller.logout);
// signup route
route.get("/signup", controller.signupPage);
route.post("/signup", controller.signup);

// todo route
route.use("/todo", todo);

// diary route
route.use("/diary", diary);

// todocalendar route
route.get("/todocalendar", controller.todoCalendar);
route.get("/todo-zh", (req, res) => res.render("todo-zh"));

route.get("/diarytimeline", function (req, res) {
  res.render("diarytimeline");
});
route.get("/todotimeline", function (req, res) {
  res.render("todotimeline");
});
route.get("/main-diary", function (req, res) {
  res.render("main-diary");
});
route.get("/startpage", function (req, res) {
  res.render("startpage");
});
route.get("/todocalendar", function (req, res) {
  res.render("todocalendar");
});

//emotion route
route.use("/emotion", emotion);

// profile route
route.get("/profile", controller.profile);

export default route;
