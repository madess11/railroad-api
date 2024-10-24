# **RailRoad API**

## **Description**
The RailRoad API is a REST API that allows users to view information about trains and stations, book tickets, and for employees to verify the validity of tickets. This API also manages authentication and authorization, allowing users to register, log in, and access different functionalities based on their roles (user, employee, or admin).

## **Features**
- **User Management**: Create, read, update, and delete users with role-based restrictions.
- **Train Management**: View, create, update, and delete train information (admin only).
- **Station Management**: View, create, update, and delete train station information (admin only).
- **Ticket Booking**: Allows users to book a ticket from one stop to another.
- **Ticket Validation**: Employees can verify the validity of a ticket.
- **Authentication**: Uses JWT for stateless authentication.
- **Swagger Documentation**: Full API documentation is available via Swagger.

## **Technologies Used**
- **Node.js** with **Express.js** or **Fastify.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** as the ORM
- **JWT** for authentication
- **Joi** or **Yup** for data validation
- **Swagger** for API documentation
- **Multer** for image handling
- **Sharp** for image resizing

## **Requirements**
Before starting, ensure that you have the following installed on your machine:
- **Node.js** (version 16 or higher)
- **MongoDB** (locally or via MongoDB Atlas)
- **npm** or **yarn** for package management

## **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/railroad-api.git
   cd railroad-api
   ```

2. **Install dependencies**
   Using **npm**:
   ```bash
   npm install
   ```
   Or with **yarn**:
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file at the root of the project with the following variables:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/railroad
   JWT_SECRET=supersecretkey
   ```

4. **Run the application**
   Using **npm**:
   ```bash
   npm run dev
   ```
   Or with **yarn**:
   ```bash
   yarn dev
   ```

   The API will be available at [http://localhost:5000](http://localhost:5000).

## **Main Endpoints**

### **Authentication**
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Log in and receive a JWT token

### **Trains**
- `GET /trains`: List all trains (available to all users)
- `POST /trains`: Create a new train (admin only)
- `PUT /trains/:id`: Update a train (admin only)
- `DELETE /trains/:id`: Delete a train (admin only)

### **Stations**
- `GET /stations`: List all stations
- `POST /stations`: Add a new station (admin only)
- `PUT /stations/:id`: Update a station (admin only)
- `DELETE /stations/:id`: Delete a station (admin only)

### **Ticket Booking**
- `POST /tickets/book`: Book a ticket
- `POST /tickets/validate`: Validate a ticket (employee only)

## **Testing**
This API includes core functionality tests. To run the tests, use:

```bash
npm test
```

or

```bash
yarn test
```

## **Documentation**
Full API documentation is available through Swagger. Once the app is running, you can access it at `/api-docs`.

## **License**
This project is licensed under the MIT License.
