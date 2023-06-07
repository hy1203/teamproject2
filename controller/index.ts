import { Request, Response } from "express";
// import {  } from "@/utils";
import multer from "multer";
import { Controller } from "@/types";

import login from "./login";
import signup from "./signup";
import calendar from "./calendar";

const upload = multer({
  dest: "views/uploads/",
});

declare module "express-session" {
  interface SessionData {
    user: number;
  }
}

//index page
async function index(req: Request, res: Response) {
  res.render("index");
}
//다이어리 쓰기 GET
async function diary_write(req: Request, res: Response) {
  res.render("diaryWrite");
}

async function upload_files(req: Request, res: Response) {
  console.log(req.file);
  res.send(req.file);
}

export default <Controller>{
  index,
  //login
  loginPage: login.get,
  login: login.post,
  //signup
  signupPage: signup.get,
  signup: signup.post,
  // todo calendar
  todoCalendar: calendar.get,

  //diary_write
  diary_write,
  upload_files,
};
