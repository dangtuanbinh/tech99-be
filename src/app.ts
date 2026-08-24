import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { swaggerUiServe, swaggerUiSetup } from './config/swagger.js';
import apiRoutes from './routes/index.js';
import { AppError } from './utils/appError.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(rateLimiterMiddleware);

app.use('/api-docs', swaggerUiServe, swaggerUiSetup);
app.use('/api', apiRoutes);

app.use((req, res, next) => {
  next(new AppError('Resource not found', 404));
});

app.use(errorMiddleware);

const startServer = async () => {
  await connectDatabase();
  app.listen(env.PORT, () => {
    logger.info(`Server is running on http://localhost:${env.PORT}`);
    logger.info(`Swagger docs available at http://localhost:${env.PORT}/api-docs`);
  });
};

startServer();
