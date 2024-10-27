import dotenv from 'dotenv'
import app from './app'
import { logger } from './utils/logger'
import { connectDB } from './configs/db/db'

dotenv.config()

// Port definition
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}).catch((error) => {
  logger.error(`Error connecting to the database: ${error.message}`)
})
