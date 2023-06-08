import { Router } from "express";
import diary from "./diary";
import todo from "./todo";
import upload from "./upload";

const route = Router();

route.use("/diary", diary);
route.use("/todo", todo);
route.use("/upload", upload);

export default route;
