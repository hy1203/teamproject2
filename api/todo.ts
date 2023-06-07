import { Router } from "express";
import todo from "@/controller/todo";
import comment from "@/controller/comment";

const route = Router();

// comment
route.post("/:year/:month/:day/:todo_id", comment.create);
route.put("/:year/:month/:day/:todo_id", comment.update);
route.delete("/:year/:month/:day/:todo_id", comment.destroy);

// todo
route.post("/:year/:month/:date", todo.post);
route.get("/:year/:month/:date", todo.get);
route.put("/:year/:month/:date/:id", todo.put);
route.patch("/:year/:month/:date/:id", todo.patch);
route.delete("/:year/:month/:date/:id", todo.destroy);
route.delete("/:year/:month/:date", todo.destroyAll);

export default route;
