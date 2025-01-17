import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RailRoad API Documentation',
    version: version,
    description: 'This is the API documentation for RailRoad ltd.',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'RailRoad API Team',
      url: 'https://railroad.com',
      email: 'contact@railroad.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],  // Point to the API routes files to read the JSDoc comments
};

// Generate the swagger specification
export const swaggerSpec = swaggerJSDoc(options);
