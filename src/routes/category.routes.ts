import { Router } from "express";
import { 
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller";

const router = Router();

// GET all categories
router.get("/", getCategories);

// GET one category by id
router.get("/:id", getCategory);

// CREATE a category
router.post("/", createCategory);

// UPDATE a category by id
router.put("/:id", updateCategory);

// DELETE a category by id
router.delete("/:id", deleteCategory);

export default router;