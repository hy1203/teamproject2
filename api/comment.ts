import { Router } from "express";
import comment from "@/controller/comment";
const route = Router();

route.post("/:todo_id", comment.create);
route.put("/:todo_id", comment.update);
route.delete("/:todo_id", comment.destroy);

export default route;
