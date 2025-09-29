# 📦 RESTful APIs – Built with Node.JS, Express.JS, Postgres, PM2, JWT, BCrypt, TypeORM, Swagger, and DDD (Domain Driven Design) aproach

A production-ready RESTful API built with Node.js, Express, TypeScript, and PostgreSQL, following Domain-Driven Design (DDD) principles. This project demonstrates modern backend development practices with enterprise-level architecture, security, and scalability.

### 💡 Project Overview

This API serves as a robust foundation for building scalable web applications, featuring secure authentication, role-based access control, and clean architecture patterns. Ideal for developers looking to understand enterprise-level backend development with TypeScript.

### ✨ Key Features
### 🔐 Security & Authentication
JWT-based Authentication with secure token management

Role-Based Access Control (RBAC) - Admin, Manager, User roles

BCrypt password hashing for enhanced security

Input validation and comprehensive error handling

### 🏗️ Architecture & Design
Domain-Driven Design (DDD) for maintainable, scalable code

Clean Architecture with separation of concerns

TypeScript for type safety and better developer experience

Modular structure following industry best practices

### 🗄️ Database & ORM
PostgreSQL with TypeORM for robust data management

Database migrations and seeding capabilities

Repository pattern for data access abstraction

Environment-specific configurations

### 🛠️ Development & Operations
PM2 process management for development and production

Swagger/OpenAPI documentation

Hot reload in development environment

Comprehensive logging and monitoring readiness

### 🏛️ Architecture & Project Structure

src/
├── base/                          # Foundation layer
│   ├── interfaces/                # Contract definitions
│   │   ├── IController.ts         # Controller interface
│   │   └── IService.ts            # Service interface
│   └── middlewares/               # Cross-cutting concerns
│       ├── data-submission-handler.ts
│       ├── error-handler.ts
│       └── id-param-handler.ts
│
├── domain/                        # Business logic layer
│   └── entities/                  # Domain models
│       ├── user-roles.entity.ts   # Role management
│       └── user.entity.ts         # User domain entity
│
├── infrastructure/                # External concerns layer
│   └── database/
│       └── data-source.ts         # Database configuration
│
├── presentation/                  # Delivery mechanism layer
│   └── user/
│       ├── controllers/           # Request handlers
│       │   ├── auth.controller.ts
│       │   ├── user-role.controller.ts
│       │   └── user.controller.ts
│       ├── services/              # Business logic
│       │   ├── auth.service.ts
│       │   ├── user-role.service.ts
│       │   └── user.service.ts
│       ├── routes/                # API endpoints
│       │   ├── auth.route.ts
│       │   ├── user-role.route.ts
│       │   └── user.route.ts
│       └── index.ts               # Module exports
│
├── config/                        # Configuration layer
│   └── swagger/                   # API documentation
├── app.ts                         # Application setup
└── index.ts                       # Entry point
🚀 Quick Start
Prerequisites
Node.js 16+

PostgreSQL 12+

npm or yarn

Installation & Setup
#### 1. Clone the repository


git clone https://github.com/EuclidesJoao/rest-api.git
cd rest-api

### 2. Install dependencies

npm install

### 3. Environment Configuration
Create a .env file with the following variables:

###### Application
API_VERSION=1.0.0
DOCUMENTATION_PATH=/api-docs
PORT=3247
NODE_ENV=development

# Database (Development)
DB_USERNAME_DEV=postgres
DB_PASSWORD_DEV=postgres
DB_NAME_DEV=rest_api
DB_HOST_DEV=localhost
DB_PORT_DEV=5432

# JWT Configuration
JWT_SECRET=supersecretjwtkey_dev
JWT_EXPIRES_IN=1d

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173


### 4. Database Setup

##### Ensure PostgreSQL is running
createdb rest_api

# Run database migrations
npm run typeorm migration:run

### 5. Start Development Server

#### Build the project
npm run watch

##### Start development server with hot reload
npm run dev


### 📚 API Documentation
Once running, access the Swagger documentation at:
http://localhost:3247/api-docs

#### Key Endpoints

###### Authentication
POST /auth/register - User registration

POST /auth/login - User authentication

##### User Management
GET /users - List users (role-based access)

POST /users - Create user (admin only)

GET /users/:id - Get user by ID

##### Role Management
GET /user-roles - Manage user roles


### 🛠️ Available Scripts
bash
npm run watch      # Build project with watch mode
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm start          # Start production server


### 🎯 Learning Objectives
This project demonstrates:

Domain-Driven Design implementation in TypeScript

Enterprise-grade security practices

Clean Architecture principles

Database management with TypeORM and migrations

RESTful API design best practices

Production-ready configuration and tooling

### 🔮 Roadmap & Future Enhancements
### 🧪 Testing
Unit & integration tests with Jest

End-to-end testing suite

Test coverage reporting

### 🐳 Containerization
Docker containerization

Docker Compose for local development

Kubernetes deployment manifests

### 🔄 CI/CD Pipeline
GitHub Actions for automated testing

Automated deployment pipelines

Quality gates and security scanning

### 📈 Monitoring & Observability
Winston logging integration

Performance monitoring

Health check endpoints

Metrics collection with Prometheus

### 🤝 Contributing
This project is open for learning and collaboration. Feel free to:

Fork the repository

Submit issues and feature requests

Create pull requests

Share feedback and suggestions

### 📄 License
This project is created for educational purposes. Feel free to use it as a reference for your own projects.

Built with ❤️ using Node.js, Express, TypeScript, PostgreSQL, and Domain-Driven Design principles.

Perfect for developers transitioning to enterprise-level backend development or looking to implement DDD in their Node.js projects.

### 🎯 Professional Use Cases
Learning Resource: Understand DDD implementation in Node.js

Boilerplate: Quick start for enterprise projects

Reference Architecture: Pattern implementation guide

Portfolio Project: Demonstrates advanced backend skills

Connect with me on LinkedIn for more insights on backend development and software architecture!

Ready to power your next enterprise application with robust, scalable, and maintainable codebase. 🚀