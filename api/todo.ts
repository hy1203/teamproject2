import { Router } from "express";
import todo from "@/controller/todo";
import comment from "./comment";

const route = Router();

// comment
route.use("/comment", comment);

// todo
route.post("/:year/:month/:date", todo.post);
route.get("/:year/:month/:date", todo.get);
route.put("/:year/:month/:date/:id", todo.put);
route.patch("/:year/:month/:date/:id", todo.patch);
route.delete("/:year/:month/:date/:id", todo.destroy);
route.delete("/:year/:month/:date", todo.destroyAll);

export default route;
