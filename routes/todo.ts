import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
route.get("/:year/:month/:day", todo.createPage);
route.post("/:year/:month/:day", todo.createTodo);
route.get("/:year/:month/:day", todo.getTodo);
route.put("/:year/:month/:day", todo.updateTodo);
route.delete("/:year/:month/:day", todo.deleteTodo);

export default route;
