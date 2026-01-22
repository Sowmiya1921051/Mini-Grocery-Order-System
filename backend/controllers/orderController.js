const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const { productName, quantity } = req.body;

        // Basic requirement: All logic in Service/Repository
        const order = await orderService.placeOrder(productName, quantity);

        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        // Handle specific business logic errors (like stock availability)
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders
};
