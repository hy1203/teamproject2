import { Router } from "express";
import controller from "@/controller";
import diary from "./diary";
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
route.get("/todo", controller.createPage);
route.post("/todo", controller.createTodo);

//diary route
route.use("/diary", diary);

route.get(
  "/todocalendar",
  todocalendarController.getTodoCalendar.bind(todocalendarController)
);

route.get("/todocalendar", function (req, res) {
  res.render("todocalendar");
});

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
