import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';
import { ApiResponse } from '../utils/response.js';

export const rateLimiterMiddleware = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req, res) => {
    ApiResponse.error(res, 'Too many requests, please try again later.', 429);
  },
});
