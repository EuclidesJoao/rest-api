"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../config"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
const { server: { version, name, docsPath }, } = config_1.default;
const options = {
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
const specifications = (0, swagger_jsdoc_1.default)(options);
app.use(docsPath, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specifications));
exports.default = app;
//# sourceMappingURL=index.js.map