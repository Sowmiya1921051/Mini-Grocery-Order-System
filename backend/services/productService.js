const productRepository = require('../repositories/productRepository');

const getAllProducts = async () => {
    return await productRepository.findAll();
};

const addProduct = async (productData) => {
    const existingProduct = await productRepository.findByName(productData.name);

    if (existingProduct) {
        // If product exists, update its stock and price
        return await productRepository.updateProduct(existingProduct._id, {
            stock: productData.stock,
            price: productData.price
        });
    }

    // If it doesn't exist, create a new one
    return await productRepository.create(productData);
};



module.exports = {
    getAllProducts,
    addProduct
};
