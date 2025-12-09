import GenericRoute from "../../../../shared/routes/generic.route";
import UserController from "../controllers/user.controller";
import { User } from "../../../../shared/types/user";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: number
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *
 *     UserDTO:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     consumes:
 *       -  application/json:
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Already exists
 *       404:
 *         description: User type not found
 *       500:
 *         description: Service unavailable
 *
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: rows
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Service unavailable
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *          application/json::
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: Updated successfully
 *
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: User not found
 */

class UserRoutes extends GenericRoute<User> {
  constructor() {
    super(UserController);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post("/", this.controller.create.bind(this.controller))
    this.router.get("/", this.controller.findAll.bind(this.controller))
    this.router.get("/:id", this.controller.findById.bind(this.controller))
    this.router.delete("/:id", this.controller.delete.bind(this.controller))
    this.router.put("/:id", this.controller.update.bind(this.controller))
  }
}

export default new UserRoutes().router;
