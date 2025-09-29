import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const MESSAGE_PART = 2;
const ERROR_CODE_PART = 1;

const errorResponses = [
  {
    statusCode: 400,
    errorCode: `BAD REQUEST`,
  },
  {
    statusCode: 401,
    errorCode: `UNAUTHORIZED`,
  },
  {
    statusCode: 404,
    errorCode: `NOT FOUND`,
  },
  {
    statusCode: 503,
    errorCode: `SERVICE UNAVAILABLE`,
  },
];

function getCodeObject(errorRequestHandler: ErrorRequestHandler) {
  const error = errorRequestHandler.toString().split(':');
  const message = error[MESSAGE_PART].trim();
  const errorCode = error[ERROR_CODE_PART].trim();

  const errorResponse = errorResponses.find(
    (error) => error.errorCode === errorCode,
  );
  const status = errorResponse?.statusCode ?? 500;

  return { status, message };
}

function getErrorCode(statusCode: number) {
  const errorResponse = errorResponses.find(
    (errorResponse) => errorResponse.statusCode === statusCode,
  );

  return errorResponse?.errorCode;
}

export function throwBadRequest(message?: string) {
  const errorCode = getErrorCode(400);
  throw new Error(`${errorCode} : ${message}`);
}

export function throwUnauthorized(message?: string) {
  const errorCode = getErrorCode(401);
  throw new Error(`${errorCode} : ${message}`);
}

export function throwNotFound(message?: string) {
  const errorCode = getErrorCode(404);
  throw new Error(`${errorCode} : ${message}`);
}

function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { status, message } = getCodeObject(error);
  response.status(status).json({ message });
}

export default errorHandler;
