import { Request, Response, NextFunction } from "express";

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id = '' } = request.params;
  const identifier = Number.parseInt(id);

  if (Number.isNaN(identifier)) {
    response.status(400).json({ message: 'id deve ser um número.' });
    return;
  }
  next();
}