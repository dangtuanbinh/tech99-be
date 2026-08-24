import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static paginated<T>(
    res: Response,
    data: T[],
    meta: { page: number; limit: number; total: number; totalPages: number },
    message: string = 'Success',
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    });
  }

  static error(
    res: Response,
    message: string = 'Internal Server Error',
    statusCode: number = 500,
    errors: any = null
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
