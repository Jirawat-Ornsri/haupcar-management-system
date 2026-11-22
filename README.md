# Haupcar Management System

A web-based car management system developed as part of the Full-Stack Developer technical assessment for Haupcar Co., Ltd.

The application allows users to manage company car information through a simple and user-friendly interface.

## Tech Stack

### Frontend
- React.js
- Vite
- Ant Design
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

## Project Structure

```text
haupcar-management-system/
│
├── frontend/          # React application
│
├── backend/           # Express REST API
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── app.js
│
├── .gitignore
└── README.md
```

## Features

- Password-based authentication
- View all car information
- Add new car information
- Edit existing car information
- Delete car information

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd haupcar-management-system
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

APP_PASSWORD=your_secure_password
JWT_SECRET=your_random_secret
JWT_EXPIRES_IN=2h
```

Start the backend development server:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

http://localhost:5173

The backend API will run at:

http://localhost:5000

## Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| CLIENT_URL | Frontend origin |
| MONGODB_URI | MongoDB Atlas connection string |
| APP_PASSWORD | Application login password |
| JWT_SECRET | Secret key used for JWT |
| JWT_EXPIRES_IN | JWT expiration time |

## API

API endpoints and usage instructions will be documented here.

## Development

Frontend and backend run independently.

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas

## License

This project was developed for educational and technical assessment purposes.