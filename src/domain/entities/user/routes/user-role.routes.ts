import GenericRoute from "../../../../shared/routes/generic.route";
import { UserRole } from "../../../../shared/types/user";
import UserRoleController from "../controllers/user-role.controller";

/**
 * @swagger
 * tags:
 *   name: User-Roles
 *   description: User roles management endpoints
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
 *     User-roles:
 *       type: object
 *       required:
 *         - designation 
 *       properties:
 *         id:
 *           type: number
 *         designation:
 *           type: string
 *
 *     UserRoleDTO:
 *       type: object
 *       properties:
 *         designation:
 *           type: string
 */

/**
 * @swagger
 * /api/user-roles:
 *   post:
 *     summary: Create a new user role
 *     tags: [User-Roles]
 *     consumes:
 *       -  application/json:
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleDTO'
 *     responses:
 *       201:
 *         description: User role successfully created
 *       400:
 *         description: Already exists
 *       404:
 *         description: User role type not found
 *       500:
 *         description: Service unavailable
 *
 *   get:
 *     summary: Get all user roles
 *     tags: [User-Roles]
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
 * /api/user-roles/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User-Roles]
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
 *         description: User role found
 *       404:
 *         description: User role not found
 *
 *   put:
 *     summary: Update a user role
 *     tags: [User-Roles]
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
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleDTO'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a user
 *     tags: [User-Roles]
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

class UserRoleRoute extends GenericRoute<UserRole> {
  constructor() {
    super(UserRoleController);
    this.initializeRoutes()
  }

  protected initializeRoutes(): void {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.get("/", this.controller.findAll.bind(this.controller));
  }
}

export default new UserRoleRoute().router;
