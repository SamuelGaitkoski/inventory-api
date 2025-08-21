import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product, Category],
});