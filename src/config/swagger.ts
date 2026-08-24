import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from './env.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products CRUD API',
      version: '1.0.0',
      description: 'Senior Backend Developer styled Products REST API with JWT Auth, Rate Limiter, and MongoDB persistence',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            category: { type: 'string' },
            stock: { type: 'number' },
            isActive: { type: 'boolean' },
            tags: {
              type: 'array',
              items: { type: 'string' },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    paths: {
      '/api/auth/token': {
        post: {
          summary: 'Generate JWT Token for Testing',
          description: 'Creates a signed JWT for testing the API. Bypasses actual password verification.',
          tags: ['Authentication'],
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', default: 'tester' },
                    role: { type: 'string', default: 'admin' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'JWT Token generated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                      data: {
                        type: 'object',
                        properties: {
                          token: { type: 'string' },
                          expiresIn: { type: 'string' },
                          tokenType: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/products': {
        post: {
          summary: 'Create a product',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'price', 'category'],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    category: { type: 'string' },
                    stock: { type: 'number' },
                    isActive: { type: 'boolean' },
                    tags: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Product created successfully' },
            400: { description: 'Validation error or product name duplicate' },
            401: { description: 'Unauthorized' },
          },
        },
        get: {
          summary: 'List products with filters and pagination',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
            { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 } },
            { in: 'query', name: 'sortBy', schema: { type: 'string', default: 'createdAt' } },
            { in: 'query', name: 'sortOrder', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } },
            { in: 'query', name: 'name', schema: { type: 'string' } },
            { in: 'query', name: 'category', schema: { type: 'string' } },
            { in: 'query', name: 'minPrice', schema: { type: 'number' } },
            { in: 'query', name: 'maxPrice', schema: { type: 'number' } },
            { in: 'query', name: 'isActive', schema: { type: 'boolean' } },
          ],
          responses: {
            200: { description: 'Products retrieved successfully' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/api/products/{id}': {
        get: {
          summary: 'Get details of a product',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Product details retrieved successfully' },
            401: { description: 'Unauthorized' },
            404: { description: 'Product not found' },
          },
        },
        put: {
          summary: 'Update product details',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    category: { type: 'string' },
                    stock: { type: 'number' },
                    isActive: { type: 'boolean' },
                    tags: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Product updated successfully' },
            401: { description: 'Unauthorized' },
            404: { description: 'Product not found' },
          },
        },
        delete: {
          summary: 'Delete a product',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Product deleted successfully' },
            401: { description: 'Unauthorized' },
            404: { description: 'Product not found' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
export { swaggerSpec };
