import { Router } from 'express';

import diary from '@/controller/diary';

const route = Router();
route.get("/", diary.redirectGets);
route.get("/:year/:month", diary.gets);
route.get("/:year/:month/:day", diary.get);
route.post("/:year/:month/:day", diary.post);

export default route;
