import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const ProductIdParamSchema = z.object({
  id: z.string().regex(objectIdRegex, 'Invalid ID format'),
});

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().int().min(0, 'Stock must be 0 or greater').default(0),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const ProductQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  name: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  isActive: z.preprocess((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }, z.boolean().optional()),
});
