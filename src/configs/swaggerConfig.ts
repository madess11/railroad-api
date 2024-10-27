import swaggerJSDoc from 'swagger-jsdoc'
import { version } from '../../package.json'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RailRoad API Documentation',
    version: version,
    description: 'This is the API documentation for RailRoad.',
    contact: {
      name: 'RailRoad API Team',
      url: 'http://localhost:5000/api',
      email: 'mamadou.and.rede@supinfo.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],  // Point to the API routes files to read the JSDoc comments
}

// Generate the swagger specification
export const swaggerSpec = swaggerJSDoc(options)
