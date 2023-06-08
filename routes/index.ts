import { Router } from "express";
import controller from "@/controller";
import diary from "./diary";
<<<<<<< HEAD
import express from "express";

import { TodoCalendarController } from "../controller/todocalendarController";
import { TimelineController } from "../controller/timelineController";
import { DairyController } from "../controller/dairyController";
import { StartPageController } from "../controller/startpageController";

const todocalendarController = new TodoCalendarController();
const timelineController = new TimelineController();
const dairyController = new DairyController();
const startpageController = new StartPageController();

const router = express.Router();
=======
import todo from "./todo";
import comment from "./comment";
>>>>>>> dev
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
route.get("/todo-zh", (req, res) => res.render("todo-zh"))

route.get("/timeline", timelineController.getTimeline.bind(timelineController));

route.get("/timeline", function (req, res) {
  res.render("timeline");
});

route.get("/dairyController", dairyController.getDairy.bind(DairyController));

route.get("/dairy", function (req, res) {
  res.render("dairy");
});

route.get(
  "/startpage",
  startpageController.getStartpage.bind(startpageController)
);

route.get("/startpage", function (req, res) {
  res.render("startpage");
});

export default route;
