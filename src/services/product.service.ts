import { ProductRepository } from '../repositories/product.repository.js';
import { IProductFilter, IPaginationOptions, IPaginatedResult } from '../types/index.js';
import { IProductDocument } from '../models/product.model.js';
import { AppError } from '../utils/appError.js';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: Partial<IProductDocument>): Promise<IProductDocument> {
    const existing = await this.productRepository.findByName(data.name!);
    if (existing) {
      throw new AppError('Product name already exists', 400);
    }
    return this.productRepository.create(data);
  }

  async getProductById(id: string): Promise<IProductDocument> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async getProducts(
    filters: IProductFilter,
    pagination: IPaginationOptions
  ): Promise<IPaginatedResult<IProductDocument>> {
    return this.productRepository.findAll(filters, pagination);
  }

  async updateProduct(id: string, data: Partial<IProductDocument>): Promise<IProductDocument> {
    await this.getProductById(id);

    if (data.name) {
      const existing = await this.productRepository.findByName(data.name);
      if (existing && (existing as any)._id.toString() !== id) {
        throw new AppError('Product name already exists', 400);
      }
    }

    const updated = await this.productRepository.update(id, data);
    if (!updated) {
      throw new AppError('Failed to update product', 500);
    }
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.getProductById(id);
    await this.productRepository.delete(id);
  }
}
