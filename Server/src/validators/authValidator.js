import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const passwordValidationMessage = 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.'

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordRegex, passwordValidationMessage),
  name: z.string().min(2),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const requestPasswordResetSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits'),
  newPassword: z.string().regex(passwordRegex, passwordValidationMessage),
})
