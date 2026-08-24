import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { CreateProductSchema, UpdateProductSchema, ProductQuerySchema, ProductIdParamSchema } from '../schemas/product.schema.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate('body', CreateProductSchema),
  asyncHandler(ProductController.create)
);

router.get(
  '/',
  authMiddleware,
  validate('query', ProductQuerySchema),
  asyncHandler(ProductController.getAll)
);

router.get(
  '/:id',
  authMiddleware,
  validate('params', ProductIdParamSchema),
  asyncHandler(ProductController.getById)
);

router.put(
  '/:id',
  authMiddleware,
  validate('params', ProductIdParamSchema),
  validate('body', UpdateProductSchema),
  asyncHandler(ProductController.update)
);

router.delete(
  '/:id',
  authMiddleware,
  validate('params', ProductIdParamSchema),
  asyncHandler(ProductController.delete)
);

export default router;
