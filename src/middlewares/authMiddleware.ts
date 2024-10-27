import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../configs/env'

interface AuthRequest extends Request {
  user?: any  // Add user field to request
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]  // Expecting "Bearer token"

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided.' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' })
  }
}
