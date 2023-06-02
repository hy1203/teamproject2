import { Router } from 'express';
import controller from '@/controller';
import diary from './diary';

const route = Router();
//index route
route.get('/', controller.index);

//login route
route.get('/login', controller.loginPage);
route.post('/login', controller.login);

//signup route
route.get('/signup', controller.signupPage);
route.post('/signup', controller.signup);

//todo route
route.get('/todo', controller.createPage);
route.post('/todo', controller.createTodo);

//diary route
route.use("/diary", diary);

export default route;
