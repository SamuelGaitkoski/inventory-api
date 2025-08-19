import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Category } from "../models/category.model";

export const getCategories = async (req: Request, res: Response) => {   
  try {
    const categories = await AppDataSource.getRepository(Category).find({ 
      relations: ["products"] 
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: { id: Number(id) },
      relations: ["products"]
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = categoryRepo.create({ name });
    await categoryRepo.save(category);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOneBy({ id: Number(id) });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name ?? category.name;
    await categoryRepo.save(category);

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOneBy({ id: Number(id) });
    
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await categoryRepo.remove(category);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};