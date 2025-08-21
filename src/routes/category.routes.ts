import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../enums/user-role.enum";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

// Admin or User access
router.get("/", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), CategoryController.getCategories);
router.get("/:id", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), CategoryController.getCategory);

// Admin-only access
router.post("/", authenticateToken, authorizeRoles(UserRole.ADMIN), CategoryController.createCategory);
router.put("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), CategoryController.updateCategory);
router.delete("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), CategoryController.deleteCategory);

export default router;