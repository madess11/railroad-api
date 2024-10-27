
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the error, or handle it appropriately
    console.error(err.stack)

    // Set the response status (default to 500 if no status is set)
    const statusCode = err.status || 500

    //  a JSON response
     res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}, // Hide stack trace in production
    })
}
