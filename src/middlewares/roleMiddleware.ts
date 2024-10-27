import { Request, Response, NextFunction } from 'express'

interface AuthRequest extends Request {
  user?: any  // Add user field to request
}

export const roleMiddleware = (requiredRole: 'admin' | 'employee') => {
  return (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: Please log in first.' })
      return
    }

    const { role } = req.user

    if (role !== requiredRole) {
      res.status(403).json({ message: `Forbidden: Requires ${requiredRole} access.` })
      return
    }

    next()
  }
}
