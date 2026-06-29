import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import redisClient from '../../../config/redis.js'
import dotenv from 'dotenv'
dotenv.config()

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const ACCESS_EXPIRY = '15m'
const REFRESH_EXPIRY = 60 * 60 * 24 * 7

export function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRY,
  })

  const refreshId = crypto.randomBytes(40).toString('hex')

  const refreshToken = jwt.sign({ userId, tokenId: refreshId }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY,
  })

  return { accessToken, refreshToken, refreshId }
}

export async function storeRefreshToken(userId, refreshId) {
  await redisClient.set(`refresh:${refreshId}`, userId, { ex: REFRESH_EXPIRY })
}

export async function removeRefreshToken(refreshId) {
  await redisClient.del(`refresh:${refreshId}`)
}

export async function verifyRefreshToken(token) {
  const payload = jwt.verify(token, REFRESH_SECRET)

  const exists = await redisClient.get(`refresh:${payload.tokenId}`)

  if (!exists) {
    throw new Error('Refresh token reuse detected')
  }

  return payload
}
