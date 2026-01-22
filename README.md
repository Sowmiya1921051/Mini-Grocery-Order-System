# Grocery 🛒 Hub - Mini Grocery Order System

A premium, full-stack grocery management and ordering system built with React, Node.js, and MongoDB. This application features smart product restocking, name-based ordering for durability, and a transactional order processing system.

## ✨ Key Features

-   **Premium Glassmorphic UI**: A modern, dark-themed interface with smooth animations and responsive design.
-   **Smart Add/Restock**: Intelligent product management. If you add a product with an existing name, the system automatically updates its price and increments its stock instead of creating duplicates.
-   **Name-Based Ordering**: Orders are identified by product names rather than internal IDs, making the system more robust for users and resistant to database changes.
-   **Adaptive Transactions**: Supports full MongoDB transactions for atomic stock reduction. Automatically detects and falls back to safe atomic operations on standalone MongoDB instances (common for local development).
-   **Order History**: Real-time order tracking showing the last 10 orders with detailed timestamps and totals.

## 🛠 Tech Stack

-   **Frontend**: React (Vite), Vanilla CSS (Custom Variable System)
-   **Backend**: Node.js, Express
-   **Database**: MongoDB (Mongoose)
-   **State Management**: React Hooks (useState, useEffect)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   MongoDB (Local instance or Atlas)

### 1. Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_TRANSACTIONS=true
```

Seed the database with initial products:

```bash
npm run seed
```

Start the server:

```bash
npm start
```

### 2. Setup Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📡 API Endpoints

### Products
- `GET /api/products`: Retrieve all products.
- `POST /api/products`: Add a new product or restock an existing one (includes price update).

### Orders
- `POST /api/orders`: Place an order using `productName` and `quantity`.
- `GET /api/orders`: Retrieve the last 10 orders.

## 🛡 Design & Engineering Decisions

-   **Atomic Updates**: The system uses `$inc` with `$gte` filters to ensure stock never goes negative, even during race conditions.
-   **Regex Safety**: Product name lookups use sanitized regex to prevent injection and handle special characters like parentheses safely.
-   **Standalone Fallback**: Designed to work out-of-the-box on standard MongoDB installs while being production-ready for Replica Sets/Sharded clusters.

---
*Created as part of the Internshalla Web Development Assignment.*
