# Product Management API

Production-grade Express.js TypeScript REST API.

## Tech Stack
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Auth**: JWT
- **Security & Utilities**: Helmet, CORS, Morgan, Express Rate Limit
- **Documentation**: Swagger UI

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (configured in `.env`) or local MongoDB

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Copy the env template file and fill in details:
```bash
cp .env.example .env
```

Ensure variables are set:
- `PORT`: Server port
- `MONGODB_URI`: Connection string (Atlas or local)
- `JWT_SECRET`: Secure secret string for token signing
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window (default 15 mins)
- `RATE_LIMIT_MAX`: Max requests allowed per window (default 50)

### 3. Execution
**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

## API Documentation
Once running, interactive API docs are available at:
`http://localhost:3000/api-docs`

## Features & Testing

### JWT Token Generation
For testing purposes, generate a JWT token using this endpoint:
- **POST** `/api/auth/token`
- **Body**: (Optional) `{ "username": "tester", "role": "admin" }`
- **Response**: Returns token details. Use the token value in the `Authorization: Bearer <TOKEN>` header for subsequent requests.

### Global Rate Limit
- Set to `50` requests per `15 minutes`.
- Exceeding this limit returns a `429 Too Many Requests` status code.
