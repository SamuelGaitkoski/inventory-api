import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../enums/user-role.enum";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), CategoryController.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get("/:id", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), CategoryController.getCategory);

router.post("/", authenticateToken, authorizeRoles(UserRole.ADMIN), CategoryController.createCategory);
router.put("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), CategoryController.updateCategory);
router.delete("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), CategoryController.deleteCategory);

export default router;