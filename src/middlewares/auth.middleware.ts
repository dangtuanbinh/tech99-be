import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthenticatedRequest, IUser } from '../types/index.js';
import { ApiResponse } from '../utils/response.js';
import { logger } from '../utils/logger.js';

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Auth failed: Authorization header missing or invalid format - ${req.method} ${req.originalUrl}`);
    ApiResponse.error(res, 'Authorization header missing or invalid format', 401);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = {
      id: decoded.sub || '',
      username: decoded.username || '',
      role: decoded.role || '',
    };
    next();
  } catch (error) {
    logger.warn(`Auth failed: Unauthorized or token expired - ${req.method} ${req.originalUrl}`);
    ApiResponse.error(res, 'Unauthorized or token expired', 401);
  }
};
