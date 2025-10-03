/**
 * @swagger
 * components:
 *  schemas:
 *      AuthUserDTO:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: The user email.
 *              password:
 *                  type: string
 *                  description: The user password.
 */
/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Authencation related routes
 * /auth:
 *  post:
 *      summary: Authenticate a user.
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AuthUserDTO'
 *      responses:
 *          200:
 *              description: User sucessfully authenticated.
 *          400:
 *              description: Wrong credentials.
 *          404:
 *              description: Not found.
 *          500:
 *              description: Service unavailable.
 *
 * /logout:
 *   post:
 *      summary: Logout signed in user.
 *      tags: [Authentication]
 *      responses:
 *          200:
 *              description: Successfully logged out.
 *          400:
 *              description: user not logged in.
 *          500:
 *              description: Service unavailable.
 *
 */
import { AuthController } from '../controllers/auth.controller';
import { verifyCreateRequestBody } from '../../base/middlewares/data-submission-handler';
import express from 'express';
import { AuthUserDTO } from '../controllers/dtos/auth-user.dto';
import errorHandler from '../../base/middlewares/error-handler';

const authRouter = express.Router();

authRouter.post(
  '/auth',
  verifyCreateRequestBody(AuthUserDTO),
  (req, res, next) => {
    AuthController.authenticate(req, res, next);
  },
);
authRouter.post('/logout', (req, res, next) => {
  AuthController.logout(req, res, next);
});
authRouter.use('/auth', errorHandler);
authRouter.use('/logout', errorHandler);

export default authRouter;
