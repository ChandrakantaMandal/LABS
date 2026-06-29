import redis from "../../../config/redis.js";

const OTP_EXPIRY = 300;

const formatEmail = (email) =>
  email?.trim().toLowerCase();

// ===================== GENERATE OTP =====================
export const generateOTP = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

// ===================== STORE OTP =====================
export const storeOTP = async (email, otp) => {
  const key = `otp:${formatEmail(email)}`;

  await redis.set(key, String(otp), { ex: OTP_EXPIRY });
};

// ===================== VERIFY OTP =====================
export const verifyOTP = async (email, otp) => {
  const key = `otp:${formatEmail(email)}`;

  const stored = await redis.get(key);

  if (!stored) {return false;}

  return String(stored) === String(otp);
};

// ===================== DELETE OTP =====================
export const deleteOTP = async (email) => {
  const key = `otp:${formatEmail(email)}`;

  await redis.del(key);
};