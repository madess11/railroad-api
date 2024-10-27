import winston from 'winston';

// Create a logger instance using Winston
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),  // Add color to the logs
    winston.format.timestamp(),  // Add timestamps to the logs
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Log to the console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),  // Error logs
    new winston.transports.File({ filename: 'logs/combined.log' }),  // Combined logs
  ],
});