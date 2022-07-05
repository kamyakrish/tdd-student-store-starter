const { storage } = require("../data/storage");
const { BadRequestError } = require("../utils/errors")

class Store {
    static async fetchProducts() {
        const products = storage.get("products").value();
        return products
    }

    static async fetchProductById(productId) {
        const product = storage.get("products").find({ id: Number(productId) }).value();
        return product;
    }

    static async createPurchaseOrder(newOrder) {
        if (!newOrder["shoppingCart"].length) {
            // Throw error
            throw new BadRequestError("Shopping Cart is Empty");
        }

        if (!newOrder["user"].name || !newOrder["user"].email) {
            throw new BadRequestError("Missing email or name");
        }
        // Required fields
        const id = storage.get("purchases").value().length + 1;
        const name = newOrder.user.name;
        const email = newOrder.user.email;
        const cart = newOrder.shoppingCart;
        const createdAt = new Date().toISOString()
        let totalCost = 0

        newOrder.shoppingCart.forEach((item) => {
            let product = storage.get("products").find({ id: Number(item.itemId) }).value();
            console.log("price is: " + product.price)
            totalCost += product.price * item.quantity;
        })

        totalCost *= 1.0875;


        const newPurchaseOrder = {
            id: id,
            name: name,
            email: email,
            cart: cart,
            createdAt: createdAt,
            total: totalCost,
            receipt: { total: totalCost, name: name, email: email, time: createdAt }
        }

        storage.get("purchases").push(newPurchaseOrder).write()

        return newPurchaseOrder;
    }
}

module.exports = Store;
