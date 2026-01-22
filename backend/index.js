require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', apiRoutes);

// Connect to MongoDB and Start Server
connectDB().then(async () => {
    const Product = require('./models/product');
    const products = await Product.find({}, 'name');
    console.log('Available Products in DB:', products.map(p => p.name));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
