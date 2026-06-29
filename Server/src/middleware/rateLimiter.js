import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, try later",
});

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5, 
  message: "Too many OTP attempts. Try later.",
});