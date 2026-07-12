import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.'),
  name: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
