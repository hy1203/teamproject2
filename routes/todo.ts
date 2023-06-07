import { Router } from "express";
import todo from "@/controller/todo";
import comment from "@/controller/comment";
const route = Router();
route.get("/:year/:month/:date", todo.createPage);

//투두 comment
route.post("/:year/:month/:day/:todo_id", comment.create);
route.put("/:year/:month/:day/:todo_id", comment.update);
route.delete("/:year/:month/:day/:todo_id", comment.destroy);
export default route;
