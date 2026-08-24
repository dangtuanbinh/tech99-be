import { Response, Request } from 'express';
import { ProductService } from '../services/product.service.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { ApiResponse } from '../utils/response.js';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
  static create = async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.createProduct(req.body);
    return ApiResponse.success(res, product, 'Product created successfully', 201);
  };

  static getById = async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.getProductById(req.params.id as string);
    return ApiResponse.success(res, product, 'Product retrieved successfully');
  };

  static getAll = async (req: Request, res: Response): Promise<Response> => {
    const { page, limit, sortBy, sortOrder, name, category, minPrice, maxPrice, isActive } = req.query as any;

    const result = await productService.getProducts(
      { name, category, minPrice, maxPrice, isActive },
      { page, limit, sortBy, sortOrder }
    );

    return ApiResponse.paginated(res, result.data, result.meta, 'Products retrieved successfully');
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.updateProduct(req.params.id as string, req.body);
    return ApiResponse.success(res, product, 'Product updated successfully');
  };

  static delete = async (req: Request, res: Response): Promise<Response> => {
    await productService.deleteProduct(req.params.id as string);
    return ApiResponse.success(res, null, 'Product deleted successfully');
  };
}
