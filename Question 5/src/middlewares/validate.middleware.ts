import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse } from '../utils/response.js';

export const validate = (
  location: 'body' | 'query' | 'params',
  schema: ZodSchema
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync(req[location]);
      const target = req[location] as any;
      if (target) {
        for (const key of Object.keys(target)) {
          delete target[key];
        }
        Object.assign(target, parsed);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((issue: any) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        ApiResponse.error(res, 'Validation failed', 400, issues);
        return;
      }
      next(error);
    }
  };
};
