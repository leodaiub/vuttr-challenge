import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

// Get all users
router.get('/', UserController.index);

// Get one tool
router.get(
  '/users/:id([0-9]+)',

  UserController.show,
);

// Create a new tool
router.post('/', UserController.store);

// Edit one tool
router.patch(
  '/users/:id([0-9]+)',

  UserController.update,
);

// Delete one tool
router.delete(
  '/users/:id([0-9]+)',

  UserController.delete,
);

export default router;
