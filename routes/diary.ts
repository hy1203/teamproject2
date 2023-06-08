import { Router } from "express";
import diary from "@/controller/diary";

const route = Router();
route.get("/:year/:month/:date", diary.daily);
route.get("/:year/:month", diary.monthly);
route.get("*", diary.redirectMonthly);

// diary_write route
route.get("/:year/:month/:date/write", diary.diaryWrite);

export default route;
