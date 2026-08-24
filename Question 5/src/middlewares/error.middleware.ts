import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors: any = null;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((val: any) => ({
      field: val.path,
      message: val.message,
    }));
  } else if (err.code === 11000) {
    statusCode = 409;
    const key = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${key}`;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field ${err.path}: ${err.value}`;
  }

  const logMessage = `${req.method} ${req.originalUrl} - Status: ${statusCode} - Message: ${message}`;

  if (statusCode >= 500) {
    logger.error(`${logMessage} - Stack: ${err.stack}`);
    if (env.NODE_ENV === 'development') {
      errors = err.stack;
    }
  } else {
    logger.warn(logMessage);
  }

  ApiResponse.error(res, message, statusCode, errors);
};
