const {storage} = require("../data/storage");

class Store{
   static async fetchProducts() {
    const allProducts = await storage.get("products").value()
    return allProducts

   }
   static async fetchProductById(productId){
    const product = storage.get("products").find({id:Number(productId)}).value()
    return product
   }

   static async purchaseOrder(){
    const purchase = await storage.get("purchases").value()
    return purchase
   }

}
module.exports = Store
