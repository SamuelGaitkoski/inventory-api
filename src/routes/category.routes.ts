import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../enums/user-role.enum";
import { 
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller";

const router = Router();

// Admin or User access
router.get("/", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), getCategories);
router.get("/:id", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), getCategory);

// Admin-only access
router.post("/", authenticateToken, authorizeRoles(UserRole.ADMIN), createCategory);
router.put("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), updateCategory);
router.delete("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), deleteCategory);

export default router;