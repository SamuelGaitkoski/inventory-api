import { Request, Response } from "express";
import { AppDataSource } from "../config/database"
import { Category } from "../models/category.model";
import { Product } from "../models/product.model"

export const getProducts = async (req: Request, res: Response) => {
  const products = await AppDataSource.getRepository(Product).find({ relations: ["category"] });
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await AppDataSource.getRepository(Product).findOne({
    where: { id: parseInt(id) },
    relations: ["category"]
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, categoryId } = req.body;
  if (!name || !price || !categoryId) {
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

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, categoryId } = req.body;

  const productRepo = AppDataSource.getRepository(Product);
  const product = await productRepo.findOne({ where: { id: parseInt(id) }, relations: ["category"] });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (categoryId) {
    const category = await AppDataSource.getRepository(Category).findOneBy({ id: categoryId });
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }
    product.category = category;
  }

  if (name) {
    product.name = name;
  }

  if (price) {
    product.price = price;
  }

  await productRepo.save(product);
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productRepo = AppDataSource.getRepository(Product);
  const product = await productRepo.findOneBy({ id: parseInt(id) });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  await productRepo.remove(product);
  res.status(204).send();
};

