import { Router } from 'express';
import diary from './diary';

const route = Router();

route.use('/diary', diary);

export default route;
