import { Router } from "express";
import diary from "./diary";
import todo from "./todo";
import upload from "./upload";
import calendar from "./calendar";

const route = Router();

route.use("/diary", diary);
route.use("/todo", todo);
route.use("/upload", upload);
route.use("/calendar", calendar);

export default route;
