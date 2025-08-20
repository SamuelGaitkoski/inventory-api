import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  static async getCategories (req: Request, res: Response) {   
    try {
      const categories = await categoryService.getAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  };

  static getCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await categoryService.getById(Number(id));

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  };

  static createCategory = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const category = await categoryService.create(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
  };

  static updateCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
    
      const updated = await categoryService.update(Number(id), name);
      if (!updated) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update category" });
    }
  };

  static deleteCategory = async (req: Request, res: Response) => {
    try {
      const deleted = await categoryService.delete(Number(req.params.id));  
      if (!deleted) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  };
}