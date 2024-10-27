import { Response, NextFunction } from 'express'
import { AuthRequest } from '../extension/AuthRequest'

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access forbidden: Admins only' })
        return
    }
    next()
}
