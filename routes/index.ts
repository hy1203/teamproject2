import { Router } from 'express';
import controller from '@/controller';

const route = Router();
//index route
route.get('/', controller.index);
//login route
route.get('/login', controller.loginPage);
//signup route
route.get('/signup', controller.signupPage);

//post_login route
route.post('/login', controller.login);
//post_signup route
route.post('/signup', controller.signup);
export default route;
