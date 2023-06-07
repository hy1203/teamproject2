import { Router } from "express";
import comment from "@/controller/comment";
const route = Router();

route.post("/comment/:todo_id", comment.create);
route.put("/comment/:todo_id", comment.update);
route.delete("/comment/:todo_id", comment.destroy);

export default route;
