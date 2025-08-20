import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { UserRole } from "../enums/user-role.enum";
import { 
  getProduct, 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/product.controller";

const router = Router();

// Admin or User access
router.get("/", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), getProducts);
router.get("/:id", authenticateToken, authorizeRoles(UserRole.USER, UserRole.ADMIN), getProduct);

// Admin-only access
router.post("/", authenticateToken, authorizeRoles(UserRole.ADMIN), createProduct);
router.put("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), updateProduct);
router.delete("/:id", authenticateToken, authorizeRoles(UserRole.ADMIN), deleteProduct);

export default router;