import { Router } from "express";
import controller from "@/controller";
import diary from "./diary";

const route = Router();
//index route
route.get("/", controller.index);

//login route
route.get("/login", controller.loginPage);
route.post("/login", controller.login);

//signup route
route.get("/signup", controller.signupPage);
route.post("/signup", controller.signup);

//todo route
route.get("/todo/:year/:month/:day", controller.createPage);
route.post("/todo/:year/:month/:day", controller.createTodo);
route.get("/todo/:year/:month/:day/:user_id", controller.getTodo);
route.put("/todo/:year/:month/:day/:user_id", controller.updateTodo);
route.delete("/todo/:year/:month/:day/:user_id", controller.deleteTodo);

//diary route
route.use("/diary", diary);

export default route;
