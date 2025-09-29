import { Request, Response, NextFunction } from 'express';

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { page = '', rows = '' } = request.query;

  if (page || rows) {
    const pageNumber = Number.parseInt(page.toString());
    const rowsNumber = Number.parseInt(rows.toString());

    if (Number.isNaN(pageNumber) || Number.isNaN(rowsNumber)) {
      response.status(400).json({ message: 'page & rows devem ser números.' });
      return;
    }
    request.params.pageNumber = pageNumber.toString();
    request.params.rowsNumber = rowsNumber.toString();
  }
  next();
}