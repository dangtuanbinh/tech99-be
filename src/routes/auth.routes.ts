import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

/**
 * @openapi
 * /api/auth/token:
 *   post:
 *     summary: Generate JWT Token for Testing
 *     description: Creates a signed JWT for testing the API. Bypasses actual password verification.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 default: tester
 *               role:
 *                 type: string
 *                 default: admin
 *     responses:
 *       200:
 *         description: JWT Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     expiresIn:
 *                       type: string
 *                     tokenType:
 *                       type: string
 */
router.post('/token', asyncHandler(AuthController.generateToken));

export default router;
