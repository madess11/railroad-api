import { AuthRequest } from "../extension/AuthRequest"
import {  Response, NextFunction } from 'express'

export const employeeMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'employee') {
        res.status(403).json({ message: 'Access forbidden: employee only' })
        return
    }
    next()
}