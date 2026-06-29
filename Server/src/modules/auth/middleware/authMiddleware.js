import jwt from 'jsonwebtoken'
import logger from '../../../utils/logger.js'

const ACCESS_SECRET = process.env.ACCESS_SECRET

if (!ACCESS_SECRET) {
  throw new Error('ACCESS_SECRET is required')
}

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, ACCESS_SECRET)

    req.user = decoded

    next()
  } catch (err) {
    logger.warn('Auth error', err)

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }

    return res.status(403).json({ message: 'Invalid token' })
  }
}
