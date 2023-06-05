import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
route.get("/:year/:month/:date", todo.createPage);
route.post("/:year/:month/:date", todo.createTodo);
route.get("/:year/:month/:date", todo.getTodo);
route.put("/:year/:month/:date", todo.updateTodo);
route.delete("/:year/:month/:date", todo.deleteTodo);

export default route;
