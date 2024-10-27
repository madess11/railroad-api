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

- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** as the ORM
- **JWT** for authentication
- **Joi**  for data validation
- **Swagger** for API documentation
- **Multer** for image handling
- **Sharp** for image resizing
- **morgan** for logs

## **Requirements**

Before starting, ensure that you have the following installed on your machine:

- **Node.js** (version 20 or higher)
- **MongoDB** (locally or via MongoDB Atlas)
- **npm** or **yarn** for package management

## **Installation**

1. **Clone the repository**

   ```bash
   git clone git@github.com:madess11/railroad-api.git
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
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/railroad
   JWT_SECRET=secretkey
   ```

4. **Run the application**
   Using **npm**:

   ```bash
   npm start
   ```

   ```bash
   npm run dev
   ```

   Or with **yarn**:

   ```bash
   yarn dev
   ```

2. The API will be available at \`<http://localhost:3000\`>.

## Database Seeding

To seed your MongoDB database with initial data:

 Run the seed script:

   ```
   npm run seed
   ```

This will populate your database with predefined data for users, stations, trains, and tickets.

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

## Contributing

We welcome contributions! Please fork the repository and create a pull request for any improvements.
