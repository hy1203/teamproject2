import { Request, Response } from "express";
// import {  } from "@/utils";
import { Controller } from "@/types";

import login from "./login";
import signup from "./signup";
import calendar from "./calendar";
import StartPage from "./startpage";
import Dairy from "./dairyC";
import diaryC from "./dairyC";
import timeline from "./timeline";
import todocalendar from "./todocalendar";

declare module "express-session" {
  interface SessionData {
    user: number;
  }
}

//index page
async function index(req: Request, res: Response) {
  res.render("index");
}

const startPage = new StartPage();

export default {
  index,
  //login
  loginPage: login.get,
  login: login.post,
  //signup
  signupPage: signup.get,
  signup: signup.post,
  // todo calendar
  todoCalendar: calendar.get,
  // startpage
  StartPage: startPage.get,
  //dairy
  diaryC: diaryC.get,
  //timeline
  timeline: timeline.get,
  //todocalendar
  todocalendar: todocalendar.get,
};
