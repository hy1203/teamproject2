import { Router } from 'express';
import controller from '@/controller';

const route = Router();
//index route
route.get('/', controller.index);
//login route
route.get('/login', controller.login);
//signup route
route.get('/signup', controller.signup);

export default route;
