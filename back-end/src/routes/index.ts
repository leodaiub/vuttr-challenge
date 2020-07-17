import { Router } from 'express';
import users from './users';
import tools from './tools';

const routes = Router();
routes.use('/tools', tools);
routes.use('/users', users);

export default routes;
