const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    const products = Product.getAll();
    res.status(200).json(products)
};

exports.getProductById = (req, res, next) => {
    try {
        const product = Product.getById(req.params.productId);
        res.status(200).json(product);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};