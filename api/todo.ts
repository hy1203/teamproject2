import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
route.post("/:year/:month/:date", todo.post);
route.get("/:year/:month/:date", todo.get);
route.put("/:year/:month/:date/:id", todo.put);
route.patch("/:year/:month/:date/:id", todo.patch);
route.delete("/:year/:month/:date/:id", todo.destroy);
route.delete("/:year/:month/:date", todo.destroyAll);

export default route;
