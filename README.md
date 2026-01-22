# Mini Grocery Order System (MongoDB Version)

This project is a full-stack grocery ordering system built with **Node.js (Express)**, **React.js**, and **MongoDB** using **Mongoose ODM**.

## 📁 Folder Structure

### Backend
Strict adherence to the required structure:
```text
backend/
├── config/         # MongoDB connection configuration
├── controllers/    # Request/Response handling
├── models/         # Mongoose Schema definitions
├── repositories/   # DB access logic using Mongoose Models
├── routes/         # Express API Route definitions (Only 2 APIs)
├── services/       # ALL Business Logic & Transaction Handling
├── .env            # Environment configurations
├── index.js        # Entry point
└── seed.js         # MongoDB seed script
```

## 🔌 API Explanation (Strictly 2 APIs)

### 1. GET `/api/products`
- **Description**: Fetches all available products from MongoDB.
- **Response**: Array of product objects containing `_id`, `name`, `price`, and `stock`.

### 2. POST `/api/orders`
- **Description**: Places a grocery order.
- **Body**: `{ productId: string, quantity: number }`
- **Logic**: Handled in a single MongoDB transaction in `orderService.js`.

## 🧠 Business Logic & Transactions

### Where Business Logic Lives
All business logic is strictly encapsulated within the **`services/`** layer (`orderService.js`). 
- **Controller**: Only handles request parameters and sends the final response.
- **Repository**: Decouples Mongoose operations from business logic.
- **Service**: Manages the life cycle of the transaction and business rules (stock check, etc.).

### How MongoDB Transaction Works
We use **MongoDB Sessions** to ensure ACID compliance:
1. A session is started via `mongoose.startSession()`.
2. A transaction is initiated within that session.
3. All operations (fetching product, updating stock, saving order) are associated with that session.
   - Update `backend/.env` with your connection string.
   - **Local Standalone Mongo**: Set `DB_TRANSACTIONS=false` if you are not using a Replica Set (avoids "Transaction numbers" error).
   - **Production/Replica Set**: Set `DB_TRANSACTIONS=true` to enable full ACID atomicity.
4. **Commit/Abort**: If successful, `commitTransaction()` is called. On any failure (like `Insufficient stock`), `abortTransaction()` is called to revert changes.

## 🚀 How to Run

1. **Database**: High-level MongoDB connection string is in `.env`. Ensure your local MongoDB is running.
2. **Seed Data**: Run `node seed.js` inside the `backend/` folder to populate the products.
3. **Backend**: Run `npm start`.
4. **Frontend**: Run `npm run dev` in the `frontend/` folder.
