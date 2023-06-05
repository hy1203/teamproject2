import { Router } from "express";
import controller from "@/controller";
import diary from "./diary";
import todo from "./todo";


import { TodoCalendarController } from "../controller/todocalendarController";

const todocalendarController = new TodoCalendarController();

const router = express.Router();
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
route.use("/todo", todo);


//diary route
route.use("/diary", diary);

route.get(
  "/todocalendar",
  todocalendarController.getTodoCalendar.bind(todocalendarController)
);

route.get("/todocalendar", function (req, res) {
  res.render("todocalendar");
});

export default route;
