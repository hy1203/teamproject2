import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
route.post("/:year/:month/:date", todo.post);
route.get("/:year/:month/:date", todo.get);
route.put("/:year/:month/:date", todo.put);
route.delete("/:year/:month/:date", todo.destroy);

export default route;
