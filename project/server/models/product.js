
const products = [
    {
        "id": "1",
        "name": "PS 4",
        "price": 200,
        "stock": 5,
        "image": `http://localhost:3000/images/ps4.png`
    },
    {
        "id": "2",
        "name": "Huawei",
        "price": 520,
        "stock": 120,
        "image": `http://localhost:3000/images/huawei.png`

    },
    {
        "id": "3",
        "name": "xbox",
        "price": 250,
        "stock": 9,
        "image": `http://localhost:3000/images/xbox.png`

    },
    {
        "id": "4",
        "name": "Xiaomi",
        "price": 500,
        "stock": 5,
        "image": `http://localhost:3000/images/xiaomi.png`
    },
]


module.exports = class Product {

    constructor(id, name, price, image, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    static getAll() {
        return products;
    }

    static getById(id) {
        const index = products.findIndex((prod) => prod.id == id);

        if (index > -1) {
            return products[index];
        } else {
            throw new Error("Product not found!");
        }
    }

    update() {
        const productIndex = products.findIndex(s => s.id == this.id);
        if (productIndex > -1) {
            products.splice(productIndex, 1, this);
        } else {
            throw new Error("Product not found!");
        }
    }
}