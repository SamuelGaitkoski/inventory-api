import express from "express";
import { json } from "express";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import { setupSwagger } from "./swagger";

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// Swagger docs
setupSwagger(app);

export default app;