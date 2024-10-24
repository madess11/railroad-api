import dotenv from 'dotenv';

// Load the environment variables from the `.env` file
dotenv.config();

// Export necessary environment variables for use in the application
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/railroad';
export const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
export const PORT = process.env.PORT || 5000;
