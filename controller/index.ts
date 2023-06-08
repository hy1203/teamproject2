import { Request, Response } from "express";
// import {  } from "@/utils";
import { Controller } from "@/types";

import login from "./login";
import signup from "./signup";
import calendar from "./calendar";
import emotion from "./emotion";

declare module "express-session" {
  interface SessionData {
    user: number;
  }
}

//index page
async function index(req: Request, res: Response) {
  res.render("index");
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

  redirectGets: emotion.redirectGets,
  emotionIndex: emotion.emotionIndex,
};
