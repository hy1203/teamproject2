import { Router } from "express";
import controller from "@/controller";

const route = Router();
route.get("/", controller.index);

export default route;
