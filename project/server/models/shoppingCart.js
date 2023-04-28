const Product = require('./product')

let db = [];
let counter = 0;

module.exports = class ShoppingCart {

    constructor(id, userId, productId, quantity, price, total) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
    }

    static fetchCarts(id) {
        if (id) {
            return db.filter((cart) => cart.userId == id);
        }
        throw new Error('Item not found!');
    }

    static filterCarts(id) {
        db = db.filter((cart) => {
            const product = Product.getById(cart.productId);
            if ((!product || cart.quantity <= product.stock)) {
                return true;
            } else {
                throw new Error('Item out of stock!');
            }
        });

        return db.filter((cart) => cart.userId == id);
    }

    static addCart(userId, productId, quantity, price, total) {
        const product = Product.getById(productId);
        const newCart = new ShoppingCart(++counter, userId, productId, quantity, price, total);

        if (product.stock < newCart.quantity) {
            throw new Error('Out of stock');
        } else {
            db.push(newCart);
            return newCart;
        }
    }

    static updateCart(id, quantity) {
        const index = db.findIndex((s) => s.id == id);
        if (index > -1) {
            let cart = db[index];
            cart.quantity = quantity;
            cart.total = (cart.price * quantity).toFixed(2);
            db.splice(index, 1, cart);
            return cart;
        } else {
            throw new Error('Item not found');
        }

    }

    static deleteCart(id) {
        const foundCart = db.find(s => s.id == id);
        if (foundCart) {
            db = db.filter(cart => cart.id != id);
        } else {
            throw new Error('Item not found');
        }
    }

    static emptyCart(id) {
        db = db.filter((cart) => cart.userId != id);
    }

}