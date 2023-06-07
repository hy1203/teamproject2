import { Router } from "express";
import todo from "@/controller/comment";

const route = Router();
//투두 comment
route.post("/:year/:month/:day/comment", todo.create);
route.put("/:year/:month/:day/comment", todo.update);
route.delete("/:year/:month/:day/comment", todo.destroy);
export default route;
