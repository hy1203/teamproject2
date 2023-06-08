import { Router } from "express";

import emotion from "@/controller/emotion";

const route = Router();
route.get("/analyze", emotion.redirectGets);
route.get("/gets", emotion.emotionIndex);

export default route;
