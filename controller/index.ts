import { Request, Response } from "express";
// import {  } from "@/utils";
import { Controller } from "@/types";

import login from "./login";
import signup from "./signup";
import todo from "./todo";

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
  //   //todo
  //   createPage: todo.createPage,
  //   createTodo: todo.createTodo,
  //   getTodo: todo.getTodo,
  //   updateTodo: todo.updateTodo,
  //   deleteTodo: todo.deleteTodo,
};
