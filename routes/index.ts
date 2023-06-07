import { Router } from "express";
import controller from "@/controller";
import diary from "./diary";
import todo from "./todo";
import comment from "./comment";

import multer from "multer";
import path from "path";

const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "views/uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});


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

// image upload
route.post(
  "/diary_write/upload",
  uploadDetail.single("upload"),
  controller.upload_files
);
// diary_write route
route.get("/diary_write", controller.diary_write);

export default route;
