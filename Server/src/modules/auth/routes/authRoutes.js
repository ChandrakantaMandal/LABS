import express from 'express'

import {
  register,
  login,
  logout,
  refreshToken,
  verifyEmailOTP,
  resendOTP,
} from '../controllers/authController.js'

import { validate } from '../../../middleware/validate.js'
import { registerSchema, loginSchema } from '../../../validators/authValidator.js'
import { verifyOtpSchema, resendOtpSchema } from '../../../validators/otpValidator.js'

import { authLimiter, otpLimiter } from '../../../middleware/rateLimiter.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', authLimiter, validate(registerSchema), register)
router.post('/verify-otp', otpLimiter, validate(verifyOtpSchema), verifyEmailOTP)
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/resend-otp', otpLimiter, validate(resendOtpSchema), resendOTP)

router.post('/refresh', refreshToken)
router.post('/logout', logout)
export default router
