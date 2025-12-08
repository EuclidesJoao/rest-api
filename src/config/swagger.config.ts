// base/config/swagger.config.ts
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: [
    "./src/**/*.ts",       // <── scans ALL TS files
    "./src/**/*.js",       // <── only if running JS in dev
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
