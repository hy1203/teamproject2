import { Router } from 'express';
import controller from '@/controller';

const route = Router();
//index route
route.get('/', controller.index);
//login route
route.get('/login', controller.loginPage);
//signup route
route.get('/signup', controller.signup);

//post_login route
route.post('/login', controller.post_login);
//post_signup route
route.post('/signup', controller.post_signup);
export default route;
