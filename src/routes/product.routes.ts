import { Router } from "express";
import { 
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";

const router = Router();

// GET all products
router.get("/", getProducts);

// GET one product by id
router.get("/:id", getProduct);

// CREATE a product
router.post("/", createProduct);

// UPDATE a product by id
router.put("/:id", updateProduct);

// DELETE a product by id
router.delete("/:id", deleteProduct);

export default router;