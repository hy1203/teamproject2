import { Router } from "express";
import auth from "@/controller/auth";
import diary from "./diary";
import todo from "./todo";

const route = Router();

route.use("/diary", diary);
route.use("/todo", todo);
route.get("/auth", auth.get);

export default route;
