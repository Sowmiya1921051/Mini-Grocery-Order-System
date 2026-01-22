const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config();

const seedProducts = [
    { name: 'Fresh Organic Apples', price: 2.50, stock: 50 },
    { name: 'Whole Milk (1L)', price: 1.20, stock: 30 },
    { name: 'Brown Eggs (Dozen)', price: 3.50, stock: 20 },
    { name: 'Sourdough Bread', price: 4.00, stock: 15 },
    { name: 'Avocado (Single)', price: 1.50, stock: 40 }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Product.deleteMany({});
        await Product.insertMany(seedProducts);
        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
