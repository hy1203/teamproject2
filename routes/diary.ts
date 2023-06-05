import { Router } from 'express';

import diary from '@/controller/diary';

const route = Router();
route.get("/:year/:month/:day", diary.get);
route.post("/:year/:month/:day", diary.post);
route.get("/:year/:month", diary.gets);
route.get("/", diary.redirectGets);

export default route;
