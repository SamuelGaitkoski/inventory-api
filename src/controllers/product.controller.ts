import { Request, Response } from "express";
import { AppDataSource } from "../config/database"
import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity"

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await AppDataSource.getRepository(Product).find({ 
      relations: ["category"] 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: parseInt(id) },
      relations: ["category"]
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: "Name, Price and CategoryId are required" });
  }

  try {
    const category = await AppDataSource.getRepository(Category).findOneBy({ 
      id: categoryId 
    });
  
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }

    const product = AppDataSource.getRepository(Product).create({ name, price, category });

    await AppDataSource.getRepository(Product).save(product);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, categoryId } = req.body;

  try {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOne({ 
      where: { id: parseInt(id) }, 
      relations: ["category"] 
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (categoryId) {
      const category = await AppDataSource.getRepository(Category).findOneBy({ 
        id: categoryId 
      });
      if (!category) {
        return res.status(400).json({ error: "Category not found" });
      }
      product.category = category;
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;

    await productRepo.save(product);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ 
      id: parseInt(id) 
    });
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await productRepo.remove(product);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

