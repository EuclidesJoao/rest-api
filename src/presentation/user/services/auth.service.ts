import userService from './user.service';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities/user.entity';
import configuration from '../../config';
import {
  throwBadRequest,
  throwNotFound,
} from '../../base/middlewares/error-handler';

const ACCOUNT_NOT_FOUND_ERROR_MESSAGE = `Erro! Não existe uma conta associada a este endereço electrônico.`;
const PASSWORD_WRONG_MESSAGE = `Erro!A palavra-chave está errada, tente novamente.`;

export class AuthService {
  static async authenticate(email: string, password: string) {
    let user: User | null;

    async function credentialsMatch(email: string, password: string) {
      user = await userService.findByEmail(email);
      if (!user) {
        throwNotFound(ACCOUNT_NOT_FOUND_ERROR_MESSAGE);
      } else {
        const { password: userPassword } = user;
        const matches = await bcrypt.compare(password, userPassword);

        return matches;
      }
    }

    async function generateToken() {
      const expiresIn = '1d';
      const { jwtSecret } = configuration;
      const token = jwt.sign(
        { id: user?.id, fkUserType: user?.fkUserType },
        jwtSecret,
        { expiresIn },
      );
      if (user) {
        return {...user, token};
      }
      
    }

    const matches = await credentialsMatch(email, password);
    if (!matches) {
      throwBadRequest(PASSWORD_WRONG_MESSAGE);
    }
    return await generateToken();
  }

  async logout(request: Request) {}
}
