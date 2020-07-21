import { Router } from 'express';
import ToolController from '../controller/ToolController';
import checkJwt from '../middlewares/checkJwt';

const router = Router();

// Get all tools
router.get('/', ToolController.index);

// Create a new tool
router.post('/', ToolController.store);

// Edit one tool
router.put('/:id([0-9]+)', [checkJwt], ToolController.update);

// Delete one tool
router.delete('/:id([0-9]+)', [checkJwt], ToolController.delete);

export default router;
