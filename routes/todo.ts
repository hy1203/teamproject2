import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
// route.get("/:year/:month/:date", todo.createPage);
route.post("/:year/:month/:date", todo.post);
route.get("/:year/:month/:date/", todo.get);
route.put("/:year/:month/:date", todo.put);
route.delete("/:year/:month/:date", todo.destroy);

//투두 comment
route.post("/:year/:month/:day/comment", todo.createTodoComment);
route.put("/:year/:month/:day/comment", todo.updateTodoComment);
route.delete("/:year/:month/:day/comment", todo.deleteTodoComment);
export default route;
