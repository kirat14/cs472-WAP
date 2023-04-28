
const ShoppingCart = require('../models/shoppingCart');
const Product = require("../models/product");

exports.addCart = (req, res, next) => {
    const user = req.user;
    const { productId, price, quantity } = req.body;
    const total = (price * quantity).toFixed(2);

    const newCart = ShoppingCart.addCart(user.id, productId, quantity, price, total);
    res.status(200).json({ ...newCart, product: Product.getById(productId) });
}

exports.fetchCarts = (req, res, next) => {
    const user = req.user;
    try {
        const carts = ShoppingCart.fetchCarts(user.id)
        .map(({ productId, userId, ...cart }) => ({ ...cart, product: Product.getById(productId) }));
    res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteCart = (req, res, next) => {
    const { id } = req.params;
    try {
        ShoppingCart.deleteCart(id);
        res.status(200).json({ message: 'Successfully deleted!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateCart = (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const cart = ShoppingCart.updateCart(id, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


exports.checkoutOrder = (req, res, next) => {
    const user = req.user;
    try {
        const carts = ShoppingCart.filterCarts(user.id);
        const products = Product.getAll();

        carts.forEach((cart) => {
            const product = products.find(p => p.id == cart.productId);
            if (!product) {
                return res.status(400).json({ error: `Item not found!` });
            } else if (cart.quantity > product.stock) {
                return res.status(400).json({ error: `Item out of stock!` });
            }
        })

        carts.forEach((cart) => {
            const tempProduct = products.find(p => p.id == cart.productId);
            const { id: pId, name, price, stock, image } = tempProduct;
            const product = new Product(pId, name, price, image, stock - cart.quantity);
            product.update();
        })

        ShoppingCart.emptyCart(user.id);

        return res.status(200).json({ message: 'Checkout successful!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}