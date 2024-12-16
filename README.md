# Travel Agency Application

A simple travel agency application that allows users to view available tour packages, book a package, and manage bookings through an admin panel.

---

## Features

1. **Customer Features:**
   - View available tour packages with details.
   - Book a package.
   - Receive a basic invoice for the booking.

2. **Admin Features:**
   - Manage tour packages (add, update, delete).
   - View and manage bookings.

---

## Project Structure

- **Frontend**: `tour-packages-app` folder (React application).
- **Backend**: `backend` folder (Node.js application).

---

## Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (or use the provided cloud database URI).

---

## Environment Variables

The backend uses environment variables for configuration. Create a `.env` file in the `backend` folder and add the following:

```
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.klg3uxc.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET=aff072a7c90997e044ddabc757710f39f5e6fffc28bf4bf22ffd1ec1706e2da0
PORT=5000
```

---

## Installation

### 1. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

### 2. Frontend Setup

1. Navigate to the `tour-packages-app` folder:
   ```bash
   cd tour-packages-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000` by default.

---

## How to Use

### Customer Workflow

1. Open the application in your browser at `http://localhost:3000`.
2. Browse available tour packages.
3. Select a package and proceed with the booking.
4. Receive a confirmation and invoice upon successful booking.

### Admin Workflow

1. Log in to the admin panel.
2. Manage packages:
   - Add new packages.
   - Update or delete existing packages.
3. View and manage customer bookings.

---

## API Endpoints (Backend)

### Authentication
- **POST** `/api/auth/login` - Admin login.

### Tour Packages
- **GET** `/api/packages` - Fetch all packages.
- **POST** `/api/packages` - Add a new package (Admin only).
- **PUT** `/api/packages/:id` - Update a package (Admin only).
- **DELETE** `/api/packages/:id` - Delete a package (Admin only).

### Bookings
- **POST** `/api/bookings` - Book a package.
- **GET** `/api/bookings` - View all bookings (Admin only).

---

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)

---

## Screenshots

### Customer View
- Tour package listing.
- Booking form.
- Invoice generation.

### Admin View
- Admin login page.
- Manage packages page.
- View bookings page.

---



