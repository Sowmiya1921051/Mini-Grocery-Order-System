const Order = require('../models/order');

const create = async (orderData, session = null) => {
    const order = new Order(orderData);
    return await order.save({ session });
};

const findAll = async () => {
    return await Order.find().sort({ createdAt: -1 });
};

module.exports = {
    create,
    findAll
};
