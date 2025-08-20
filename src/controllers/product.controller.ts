import { Request, Response } from "express";
import { AppDataSource } from "../config/database"
import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity"
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class CategoryController {
  static async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };

  static async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getById(Number(id));

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  };

  static async createProduct(req: Request, res: Response) {
    try {
      const { name, price, categoryId } = req.body;

      if (!name || !price || !categoryId) {
        return res.status(400).json({ error: "Name, Price and CategoryId are required" });
      }

      const product = await productService.create(name, price, categoryId);

      if (!product) {
        return res.status(400).json({ error: "Category not found" });
      }
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  };

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, categoryId } = req.body;

      const product = await productService.update(Number(id), name, price, categoryId);

      if (!product) {
        return res.status(404).json({ error: "Product not found or category invalid" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  };

  static async deleteProduct(req: Request, res: Response) {
    try {
      const deleted = await productService.delete(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  };
}