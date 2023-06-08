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

// signup route
route.get("/signup", controller.signupPage);
route.post("/signup", controller.signup);

// todo route
route.use("/todo", todo);

// diary route
route.use("/diary", diary);

// todocalendar route
route.get("/todocalendar", controller.todoCalendar);

//emotion route
route.use("/emotion", emotion);

export default route;
