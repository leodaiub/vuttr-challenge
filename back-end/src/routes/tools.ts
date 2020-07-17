import { Router } from 'express';
import ToolController from '../controller/ToolController';

const router = Router();

// Get all tools
router.get('/', ToolController.index);

// Get one tool
router.get('/tools/:id([0-9]+)', ToolController.show);

// Create a new tool
router.post('/', ToolController.store);

// Edit one tool
router.patch('/tools/:id([0-9]+)', ToolController.update);

// Delete one tool
router.delete('/tools/:id([0-9]+)', ToolController.delete);

export default router;
