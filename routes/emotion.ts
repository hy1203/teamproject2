import { Router } from "express";

import emotion from "@/controller/emotion";

const route = Router();
route.get("/analyze", emotion.get);
// route.get("/analyze/:year/:month", emotion.redirectGets);  // 결과물을 보기 위해서 주석처리
route.get("/gets", emotion.emotionIndex);

export default route;
