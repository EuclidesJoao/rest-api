# 📦 Awesome Project – Built with TypeORM

A RESTful API built with TypeScript, Express.js, PostgreSQL, and TypeORM, following a Domain-Driven Design (DDD) approach.
Includes JWT authentication, role-based authorization, and data caching for better performance and security.

🚀 Features

✅ User registration & authentication with JWT

✅ Role-based authorization (Admin, Manager, User)

✅ Product management (CRUD operations)

✅ Database migrations & seeding with TypeORM

✅ Data caching for frequent queries

✅ Input validation & error handling

✅ Clean architecture with DDD principles

🛠️ Tech Stack

TypeScript – strongly typed language for scalable applications

Express.js – fast, unopinionated, and minimalist web framework

PostgreSQL – robust relational database

TypeORM – TypeScript ORM for database modeling and queries

JWT – secure authentication

DDD – for modular and maintainable code

📂 Project Structure
src/
 ├── domain/         # Entities, value objects, and domain logic
 ├── infrastructure/ # Database, TypeORM config, repositories
 ├── application/    # Use cases, services
 ├── presentation/   # Controllers, routes, middlewares
 ├── config/         # Environment & app configuration
 └── index.ts        # Application entry point

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/your-username/your-repo.git
cd your-repo


Install dependencies

## npm install


Setup database connection
Update your database settings in data-source.ts (PostgreSQL).

Configure environment variables
Create a .env file in the root directory and add:

### PORT=3000
### JWT_SECRET=your-secret-key
### DB_HOST=localhost
### DB_PORT=5432
### DB_USER=your-db-user
### DB_PASS=your-db-password
### DB_NAME=your-db-name


Run database migrations

## npm run typeorm migration:run


# Start the project

## npm start

🧪 Scripts

## npm run dev → Run in development with hot reload

## npm run build → Build project

## npm start → Start compiled project

## npm run typeorm → Run TypeORM CLI commands

📖 API Documentation

Example routes:

## POST /auth/register → Create a new user

## POST /auth/login → Login and receive JWT

## GET /products → List all products (requires role)

## POST /products → Create product (admin only)

🎯 Goals

This project is mainly for practice and learning:

Mastering TypeORM with PostgreSQL

Applying Domain-Driven Design in real-world scenarios

Building secure, scalable, and clean REST APIs

🔗 Feel free to fork, use, and give feedback!
