import dotenv from 'dotenv'

dotenv.config()

// Export necessary environment variables for use in the application
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/railroad'
export const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret'
export const PORT = process.env.PORT || 3000
