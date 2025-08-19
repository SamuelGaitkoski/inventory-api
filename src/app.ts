import express from "express";
import { json } from "express";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(json());
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);

export default app;