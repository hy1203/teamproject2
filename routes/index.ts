import { Router } from 'express';
import controller from '@/controller';
import diary from './diary';

const route = Router();
//index route
route.get('/', controller.index);
//login route
route.get('/login', controller.loginPage);
//signup route
route.get('/signup', controller.signupPage);
//todo route
route.get('/todo', controller.createPage);

//post_login route
route.post('/login', controller.post_login);
//post_signup route

route.post('/signup', controller.signup);
//post_todo route
route.post('/todo', controller.createTodo);

route.post('/signup', controller.post_signup);

//diary route
route.use("/diary", diary);

export default route;
