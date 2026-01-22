const productService = require('../services/productService');

const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await productService.addProduct(req.body);

        // Check if the result's version or ID suggests an update or create
        // Actually, we can just check if the name was already there
        // But the service now returns the updated/created product.
        // Let's make it simpler by just returning the product and letting the service handle logic.

        res.status(201).json({
            message: 'Product processed successfully',
            product: result
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

module.exports = {
    getProducts,
    createProduct
};
