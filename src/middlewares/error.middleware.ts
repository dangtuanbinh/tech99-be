import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';
import { ApiResponse } from '../utils/response.js';
import { env } from '../config/env.js';

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
    statusCode = 400;
    const key = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${key}`;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field ${err.path}: ${err.value}`;
  }

  if (env.NODE_ENV === 'development' && statusCode === 500) {
    console.error(err);
    errors = err.stack;
  }

  ApiResponse.error(res, message, statusCode, errors);
};
