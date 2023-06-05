import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
route.get("/:year/:month/:day", todo.createPage);
route.post("/:year/:month/:day", todo.createTodo);
route.get("/:year/:month/:day", todo.getTodo);
route.put("/:year/:month/:day", todo.updateTodo);
route.delete("/:year/:month/:day", todo.deleteTodo);
//투두 comment
route.post("/:year/:month/:day/comment", todo.createTodoComment);
route.put("/:year/:month/:day/comment", todo.updateTodoComment);
route.delete("/:year/:month/:day/comment", todo.deleteTodoComment);
export default route;
