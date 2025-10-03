import { NextFunction, Response, Request } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async authenticate(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { email, password } = request.body;
    try {
      const data = await AuthService.authenticate(email, password);
      return response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async logout(request: Request, response: Response, next: NextFunction) {
    return response.status(200).json({ message: 'Logout' });
  }
}
