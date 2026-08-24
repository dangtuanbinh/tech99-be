import { Request } from 'express';

export interface IUser {
  id: string;
  username: string;
  role: string;
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductFilter {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
