import { Request, Response, NextFunction } from 'express';

export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
    // 1. Content Security Policy (CSP)
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
    );

    // 2. X-Content-Type-Options: Prevent MIME type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    // 3. X-Frame-Options: Prevent clickjacking
    res.setHeader("X-Frame-Options", "DENY");

    // 4. Strict-Transport-Security (HSTS): Force HTTPS
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    // 5. X-XSS-Protection: Enable XSS filtering
    res.setHeader("X-XSS-Protection", "1; mode=block");

    next(); 
};
