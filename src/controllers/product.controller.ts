import { Request, Response } from "express";
import { AppDataSource } from "../config/database"
import { Category } from "../models/category.model";
import { Product } from "../models/product.model"

export const getProducts = async (req: Request, res: Response) => {
  const products = await AppDataSource.getRepository(Product).find({ relations: ["category"] });
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, categoryId } = req.body;
  if (!name || !price || categoryId) {
    return res.status(400).json({ error: "Name, Price and CategoryId are required" });
  }

  const category = await AppDataSource.getRepository(Category).findOneBy({ id: categoryId });
  if (!category) {
    return res.status(400).json({ error: "Category not found" });
  }

  const product = AppDataSource.getRepository(Product).create({ name, price, category });
  await AppDataSource.getRepository(Product).save(product);

  res.status(201).json(product);
};

