# Haupcar Car Management System

A full-stack web application for managing vehicle information, built as part of the Software Developer technical assessment for Haupcar Co., Ltd.

## Features

- **Authentication** – Secure login using JWT (JSON Web Token).
- **Dashboard** – View total cars and total car brands.
- **Car Management**
  - View all registered cars.
  - Add new car records.
  - Edit existing car information.
  - Delete car records.
  - Search cars by registration number, brand, or model.
- **Data Validation** – Validate required fields and prevent duplicate registration numbers.
- **Protected API Routes** – Require authentication for car management operations.

## Tech Stack

### Frontend
- React
- Vite
- Ant Design
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Project Structure

```text
haupcar-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or a MongoDB instance
- Git

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd haupcar-management-system
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on `.env.example`.

Configure the following environment variables:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
APP_USERNAME=admin
APP_PASSWORD=your_secure_password
JWT_SECRET=your_random_secret
JWT_EXPIRES_IN=2h
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory based on `.env.example`.

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Start Backend

From the `backend` directory:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

### Start Frontend

From the `frontend` directory:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/login` | User login | No |

### Cars

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/cars` | Get all cars | Required |
| GET | `/api/cars/:id` | Get car by ID | Required |
| POST | `/api/cars` | Create a new car | Required |
| PUT | `/api/cars/:id` | Update car information | Required |
| DELETE | `/api/cars/:id` | Delete a car | Required |

Protected endpoints require a Bearer Token in the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Environment Variables

Never commit `.env` files or expose credentials in a public repository.

Use `.env.example` as a template and provide your own configuration.

## Author

Developed as part of the Haupcar Software Developer technical assessment.