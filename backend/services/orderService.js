const mongoose = require('mongoose');
const orderRepository = require('../repositories/orderRepository');
const productRepository = require('../repositories/productRepository');

// file:///d:/Projects/INTERNSHALLA/Mini%20Grocery%20Order%20System/backend/services/orderService.js

const placeOrder = async (productName, quantity) => {
    // Check if the current environment supports transactions (needs Replica Set)
    const topology = mongoose.connection.getClient().topology;
    const topologyType = topology?.description?.type;
    const isReplicaSet = topologyType === 'ReplicaSetWithPrimary' || topologyType === 'Sharded';
    const useTransaction = process.env.DB_TRANSACTIONS === 'true' && isReplicaSet;

    const session = useTransaction ? await mongoose.startSession() : null;

    try {
        let order;

        const performOrderAction = async (activeSession) => {
            // ● Check if the product exists by Name
            const product = await productRepository.findByName(productName);
            if (!product) throw new Error('Product not found');

            const productId = product._id;

            // ● Check stock availability & Reject if insufficient
            if (product.stock < quantity || quantity <= 0) {
                throw new Error('Insufficient stock or invalid quantity');
            }

            // ● Reduce product stock (Atomic update)
            const updatedProduct = await productRepository.decreaseStock(productId, quantity, activeSession);
            if (!updatedProduct) throw new Error('Insufficient stock (race condition occurred)');

            // ● Create order record
            const totalPrice = product.price * quantity;
            order = await orderRepository.create({ productId, quantity, totalPrice }, activeSession);
        };

        if (useTransaction && session) {
            await session.withTransaction(() => performOrderAction(session));
        } else {
            // Standalone mode Fallback: Pass null as session to avoid "Transaction numbers..." error
            await performOrderAction(null);
        }

        return order;
    } finally {
        if (session) session.endSession();
    }
};

module.exports = {
    placeOrder
};
