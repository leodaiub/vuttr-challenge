import { Router } from 'express';
import auth from './auth';
import tools from './tools';

const routes = Router();
routes.use('/tools', tools);
routes.use('/auth', auth);

export default routes;
