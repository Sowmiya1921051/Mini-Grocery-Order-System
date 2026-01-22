const Product = require('../models/product');

const findAll = async () => {
    return await Product.find().sort({ _id: 1 });
};

const findById = async (id, session = null) => {
    return await Product.findById(id).session(session);
};

const decreaseStock = async (id, quantity, session = null) => {
    return await Product.findOneAndUpdate(
        { _id: id, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { session, new: true }
    );
};

const create = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const findByName = async (name) => {
    return await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(
        id,
        {
            $inc: { stock: productData.stock },
            $set: { price: productData.price }
        },
        { new: true }
    );
};

module.exports = {
    findAll,
    findById,
    decreaseStock,
    create,
    findByName,
    updateProduct
};
