import { Router } from "express";
import auth from "@/controller/auth";
import diary from "./diary";
import todo from "./todo";
import upload from "./upload";

const route = Router();

route.use("/diary", diary);
route.use("/todo", todo);
route.use("/upload", upload);
route.get("/auth", auth.get);

export default route;
