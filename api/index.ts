import { Router } from 'express';
import diary from './diary';
import todo from './todo';

const route = Router();

route.use('/diary', diary);
route.use('/todo', todo);

export default route;
