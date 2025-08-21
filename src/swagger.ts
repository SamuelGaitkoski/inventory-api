import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory API",
      version: "1.0.0",
      description: "API documentation",
    },
    components: {
      schemas: {
        Category: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "string",
              description: "Auto-generated ID",
            },
            name: {
              type: "string",
              description: "Category name",
            },
          },
          example: {
            id: "123",
            name: "Electronics",
          },
        },
        Product: {
          type: "object",
          required: ["name", "price", "categoryId"],
          properties: {
            id: {
              type: "string",
              description: "Auto-generated ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            categoryId: {
              type: "string",
              description: "ID of the category this product belongs to",
            },
          },
          example: {
            id: "456",
            name: "Smartphone",
            price: 699.99,
            categoryId: "123",
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};