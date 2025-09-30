/**
 * @swagger
 * components:
 *  schemas:
 *      UserType:
 *          type: object
 *          required:
 *              - designation
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id of the user type.
 *              designation:
 *                  type: string
 *                  description: The designation of the user type.
 *              description:
 *                  type: string
 *                  description: Brief description of the user type.
 *              status:
 *                  type: string
 *                  description: Current status of the user type.
 *          example:
 *              id: 1
 *              designation: Administrator
 *              description: Has permission to interact with every aspect of the app.
 *              status: Active.
 *
 *      UserTypeDTO:
 *          type: object
 *          properties:
 *              designation:
 *                  type: string
 *                  description: The designation of the user type.
 *              description:
 *                  type: string
 *                  description: Brief description of the user type.
 *              status:
 *                  type: string
 *                  description: Current status of the user type.
 */
/**
 * @swagger
 * tags:
 *  name: User Types
 *  description: The user types managing routes
 * /user-types:
 *  post:
 *      summary: Create a new user type
 *      tags: [User Types]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserTypeDTO'
 *      responses:
 *          201:
 *              description: User type succesfully created.
 *          400:
 *              description: Already exists.
 *          500:
 *              description: Service unavailable.
 *
 *  get:
 *      summary: Find all user types
 *      tags: [User Types]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema: 
 *            type: integer
 *          description: Number of the page (for pagination purposes).
 *          required: false         
 * 
 *        - in: query
 *          name: rows
 *          schema: 
 *            type: integer
 *          description: Number of rows per page (for pagination purposes).
 *          required: false
 * 
 *        - in: query
 *          name: searchTerm
 *          schema: 
 *            type: string
 *          description: Used to filter data.
 *          required: false         
 * 
 * 
 *      responses:
 *          200:
 *              description: Successfully returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/UserType'
 *          500:
 *              description: Service unavailable.
 *
 * /user-types/{id}:
 *   get:
 *      summary: Find a user type by id.
 *      tags: [User Types]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The user type id
 *      responses:
 *          200:
 *              description: Successfully returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserType'
 *          400:
 *              description: id must be a number.
 *          500:
 *              description: Service unavailable.
 *
 *   put:
 *      summary: Update a user type by id.
 *      tags: [User Types]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The user type id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserTypeDTO'
 *      responses:
 *          200:
 *              description: Successfully updated.
 *          400:
 *              description: id must be a number.
 *          404:
 *              description: user type not found.
 *          500:
 *              description: Service unavailable.
 *
 *   delete:
 *      summary: Delete a user type by id.
 *      tags: [User Types]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The user type id
 *      responses:
 *          200:
 *              description: Successfully deleted.
 *          400:
 *              description: id must be a number.
 *          404:
 *              description: user type not found.
 *          500:
 *              description: Service unavailable.
 *
 */
// import getRouterBase from "../../../base/router"

// const userRoleRouter = getRouterBase('user-roles', )