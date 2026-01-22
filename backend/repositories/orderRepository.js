const Order = require('../models/order');

const create = async (orderData, session = null) => {
    const order = new Order(orderData);
    return await order.save({ session });
};

module.exports = {
    create
};
