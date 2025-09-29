import express from "express";
import configuration from "..";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc, { Options } from "swagger-jsdoc";

const app = express();

const {
  server: { version, name, docsPath },
} = configuration;

const options: Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: name,
      version,
      description: `
        A RESTful API designed to handle user authentication and management.  
        This API provides endpoints for:
        - User registration (sign up)
        - User authentication (login)
        - Updating user information
        - Deleting users  
        
        It follows industry best practices with JWT-based authentication, 
        input validation, and secure password handling.
      `,
      contact: {
        name: "Euclides João",
        email: "euclidesjoao.dev@gmail.com",
        url: "https://github.com/EuclidesJoao",
      },
    },
  },
  apis: [__dirname + "/../**/*.routes{.ts,.js}"],
};

const specifications = swaggerJSDoc(options);
app.use(docsPath, swaggerUI.serve, swaggerUI.setup(specifications));

export default app;
