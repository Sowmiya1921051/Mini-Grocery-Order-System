# Grocery Hub 🛒

A concise guide to the Mini Grocery Order System.

## 📁 Folder Structure
```text
/root
├── backend
│   ├── config/         # DB connection
│   ├── controllers/    # Request handling
│   ├── models/         # Mongoose schemas
│   ├── repositories/   # Data access logic
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   └── seed.js         # Initial data
└── frontend
    └── src/
        ├── App.jsx     # Main UI logic
        └── App.css     # Premium styling
```

## 🔄 API Flow
1. **Request**: UI sends JSON via `fetch` (e.g., `POST /api/orders`).
2. **Controller**: Validates basic input and calls the Service.
3. **Service**: Coordinates the operation (logic, calculations).
4. **Repository**: Executes DB operations (CRUD).
5. **Response**: JSON status/data returned to UI.

## ⚙️ Concurrency Handling
- **Atomic Operations**: Uses MongoDB `$inc` with a `$gte` stock condition. This ensures stock decreases only if sufficient, preventing race conditions.
- **Transactional Safety**: Implements `session.withTransaction()` for multi-document consistency (Stock Update + Order Creation).
- **Adaptive Detection**: Automatically detects if the DB supports transactions (Replica Sets) and falls back to safe atomic updates on Standalone instances.

## 🚀 Quick Start
- **Backend**: `npm install && npm start`
- **Frontend**: `npm install && npm run dev`
