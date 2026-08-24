import type { QueryFilter } from 'mongoose';
import { BaseRepository } from './base.repository.js';
import { IProductDocument, ProductModel } from '../models/product.model.js';
import { IProductFilter, IPaginationOptions, IPaginatedResult } from '../types/index.js';

export class ProductRepository extends BaseRepository<IProductDocument> {
  constructor() {
    super(ProductModel);
  }

  async findAll(
    filters: IProductFilter,
    pagination: IPaginationOptions
  ): Promise<IPaginatedResult<IProductDocument>> {
    const query: QueryFilter<IProductDocument> = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }

    const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(query).sort(sort).skip(skip).limit(limit).exec(),
      this.model.countDocuments(query).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findByName(name: string): Promise<IProductDocument | null> {
    return this.model.findOne({ name }).exec();
  }
}
