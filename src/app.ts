import express from "express";
import { json } from "express";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import { setupSwagger } from "./swagger";

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);

// Swagger docs
setupSwagger(app);

export default app;