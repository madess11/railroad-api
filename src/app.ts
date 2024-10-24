import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import trainRoutes from './routes/trainRoutes';
import stationRoutes from './routes/stationRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';
import { securityHeaders } from './middlewares/securityHeaders';
// import { swaggerSpec } from './config/swaggerConfig';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './configs/swaggerConfig';



const app: Application = express();



// Middleware setup
app.use(securityHeaders); // Use security headers middleware
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded bodies
app.use(express.json());  // Parses incoming JSON requests
app.use(cors());  // Enables CORS
app.use(errorHandler); // Error handling middleware
app.use(morgan('dev'));  // HTTP request logger

// Routes setup
app.use('/api/auth', authRoutes);  // Authentication routes (user login/signup)
app.use('/api/trains', trainRoutes);  // Train-related routes
app.use('/api/stations', stationRoutes);  // Train station-related routes
app.use('/api/tickets', ticketRoutes);  // Ticket-related routes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger documentation route


// User management routes (Admin only)
app.use('/api/users', userRoutes);

// Catch-all route for undefined paths
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});



export default app;
