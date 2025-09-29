/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - phoneNumber
 *              - birthDate
 *              - profilePhotoUrl
 *              - fkUserType
 *              - createdAt
 *              - updatedAt
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id of the user type.
 *              firstName:
 *                  type: string
 *                  description: User first name.
 *              lastName:
 *                  type: string
 *                  description: User last name.
 *              email:
 *                  type: string
 *                  description: User's email.
 *              password:
 *                  type: string
 *                  description: User's encrypted password.
 *              phoneNumber:
 *                  type: string
 *                  description: User's phone number.
 *              birthDate:
 *                  type: date
 *                  description: User's birth date.
 *              profilePhotoUrl:
 *                  type: string
 *                  description: User's profile photo url.
 *              fkUserType:
 *                  type: number
 *                  description: User type foreign key.
 *              createdAt:
 *                  type: date
 *                  description: User created date.
 *              updatedAt:
 *                  type: date
 *                  description: User last update date.
 *          example:
 *              id: 1
 *              firstName: Emanuel
 *              lastName: Moura
 *              email: epokuiso@gmail.com
 *              password: Akndisnfin2233dknsjknsfn
 *              phoneNumber: +244936339995
 *              birthDate: 1998-01-06
 *              profilePhotoUrl: http://url.domain
 *              fkUserType: { id: 1, designation: Administrator }
 *              createdAt: 1998-01-06
 *              updatedAt: 2025-07-23
 *
 *      UserDTO:
 *          type: object
 *          properties:
 *              image:
 *                  type: file
 *                  description: User profile picture.
 *              firstName:
 *                  type: string
 *                  description: User first name.
 *              lastName:
 *                  type: string
 *                  description: User last name.
 *              email:
 *                  type: string
 *                  description: User's email.
 *              password:
 *                  type: string
 *                  description: User's encrypted password.
 *              phoneNumber:
 *                  type: string
 *                  description: User's phone number.
 *              birthDate:
 *                  type: date
 *                  description: User's birth date.
 *              fkUserType:
 *                  type: number
 *                  description: User type foreign key.
 */
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The user managing routes
 * paths:
 *  /users:
 *    post:
 *        summary: Create a new user
 *        consumes:
 *          - multipart/form-data
 *        tags: [Users]
 *        requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UserDTO'
 *        responses:
 *            201:
 *                description: User succesfully created.
 *            400:
 *                description: Already exists.
 *            404:
 *                description: User type not found.
 *            500:
 *                description: Service unavailable.
 *
 *    get:
 *        summary: Find all users
 *        tags: [Users]
 *        parameters:
 *          - in: query
 *            name: page
 *            schema: 
 *              type: integer
 *            description: Number of the page (for pagination purposes).
 *            required: false         
 * 
 *          - in: query
 *            name: rows
 *            schema: 
 *               type: integer
 *            description: Number of rows per page (for pagination purposes).
 *            required: false
 * 
 *          - in: query
 *            name: searchTerm
 *            schema: 
 *              type: string
 *            description: Used to filter data.
 *            required: false         
 * 
 *        responses:
 *          200:
 *              description: Successfully returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          500:
 *              description: Service unavailable.
 *
 * /users/{id}:
 *   get:
 *      summary: Find a user by id.
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: Successfully returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: id must be a number.
 *          500:
 *              description: Service unavailable.
 *
 *   put:
 *      summary: Update a user by id.
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UserDTO'
 *      responses:
 *          200:
 *              description: Successfully updated.
 *          400:
 *              description: id must be a number.
 *          404:
 *              description: user or user type not found.
 *          500:
 *              description: Service unavailable.
 *
 *   delete:
 *      summary: Delete a user type by id.
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: Successfully deleted.
 *          400:
 *              description: id must be a number.
 *          404:
 *              description: user not found.
 *          500:
 *              description: Service unavailable.
 *
 */