import { DataSource } from "typeorm";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // auto-create tables (dev only)
  logging: false,
  entities: [Product, Category],
});