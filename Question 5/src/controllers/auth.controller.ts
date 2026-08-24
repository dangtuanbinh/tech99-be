import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiResponse } from '../utils/response.js';

export class AuthController {
  static generateToken = async (req: Request, res: Response): Promise<Response> => {
    const { username = 'tester', role = 'admin' } = req.body;

    const payload = {
      username,
      role,
      sub: new Date().getTime().toString(),
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    return ApiResponse.success(res, {
      token,
      expiresIn: env.JWT_EXPIRES_IN,
      tokenType: 'Bearer',
    }, 'Token generated successfully');
  };
}
