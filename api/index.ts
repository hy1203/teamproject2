import { Router } from "express";
import auth from "@/controller/auth";
import diary from "./diary";
import todo from "./todo";
import upload from "./upload";
import calendar from "./calendar";

const route = Router();

route.use("/diary", diary);
route.use("/todo", todo);
route.use("/upload", upload);
route.use("/calendar", calendar);
route.get("/auth", auth.get);

export default route;
