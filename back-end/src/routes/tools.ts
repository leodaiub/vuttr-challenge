/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
import { Router } from 'express';
import ToolController from '../controller/ToolController';

const router = Router();

// Get all tools
router.get('/', ToolController.index);

// Create a new tool
router.post('/', ToolController.store);

// Edit one tool
router.put('/:id([0-9]+)', ToolController.update);

// Delete one tool
router.delete('/:id([0-9]+)', ToolController.delete);

export default router;
