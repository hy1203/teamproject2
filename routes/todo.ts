import { Router } from "express";
import todo from "@/controller/todo";

const route = Router();
route.get("/:year/:month/:date", todo.daily);

export default route;
