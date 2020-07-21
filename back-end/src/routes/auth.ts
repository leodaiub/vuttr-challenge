import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();
// Login route
router.post('/login', AuthController.login);

// Register route
router.post('/register', AuthController.register);

export default router;
