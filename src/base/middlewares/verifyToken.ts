import { Request, Response, NextFunction } from 'express';
import { throwUnauthorized } from '../../base/middlewares/error-handler';
import configuration from '../../config';
import jwt from 'jsonwebtoken';

function verifyUserToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const AUTHORIZATION_HEADER = 'Authorization';
  const LOGIN_NEEDED_ERROR_MESSAGE = `Acesso negado! Deve iniciar a sessão para poder avançar.`;
  const INVALID_TOKEN_ERROR_MESSAGE = `Acesso negado! O seu token deve ter expirado, por favor inicie a sessão para conseguir avançar.`;

  const token = request.header(AUTHORIZATION_HEADER);

  if (!token) {
    throwUnauthorized(LOGIN_NEEDED_ERROR_MESSAGE);
  }
  try {
    const { jwtSecret } = configuration;
    const tokenOnly = token?.split(' ')[1] ?? '';
    jwt.verify(tokenOnly, jwtSecret);

    next();
  } catch {
    throwUnauthorized(INVALID_TOKEN_ERROR_MESSAGE);
  }
}

export default verifyUserToken;
