import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../enums/user-role.enum";
import { ProductController } from "../controllers/product.controller";

const router = Router();

// Admin or User access
router.get("/", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), ProductController.getProducts);
router.get("/:id", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), ProductController.getProduct);

// Admin-only access
router.post("/", authenticateToken, authorizeRoles(UserRole.ADMIN), ProductController.createProduct);
router.put("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), ProductController.updateProduct);
router.delete("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), ProductController.deleteProduct);

export default router;