const express = require("express")
const router = express.Router()
const Store = require("../models/store")
const {NotFoundError, BadRequestError} = require("../utils/errors")

router.get("/", async (req, res, next) =>{
     try{
    const products = await Store.fetchProducts()
        return res.status(200).json({"products": products})
     }
     catch(err){
        next(err)
     }
})

router.get("/:productId", async (req, res, next)=>{
    try{
    const productId = req.params.productId
    const product = await Store.fetchProductById(productId)
    if(!product){
        throw new NotFoundError("Transaction not found")
    }
    res.status(200).json({product})
    }catch(err){
        next(err)
    }
})

router.post("/",async (req,res, next)=> {

try{
    const shoppingCart = req.body.shoppingCart
    const user = req.body.user
    let total = 0
    const lines = [`Showing receipt for ${user.name} available at ${user.email}: `]
    let productPrices = []
    let productNames = []
    let totalQuantity = 0

if(shoppingCart && user){
shoppingCart.forEach(async(item) => {
    if("quantity" in item && "itemId" in item){
        const productDetails = await Store.fetchProductById(item.itemId)
        let newTotal = (item.quantity * productDetails.price).toFixed(2)
        totalQuantity += item.quantity
        total += parseFloat(newTotal)
        productPrices.push(productDetails.price)
        if(!productNames.includes(productDetails.name)){
            productNames.push(productDetails.name)
        } else{
            throw new BadRequestError("duplicate products inside shopping cart")
        }
        lines.push(`${item.quantity} total ${productDetails.name} purchased at a cost of $${productDetails.price} for a total cost of $${newTotal}. `)
    }else{
        throw new BadRequestError("Each item in the shopping cart should have itemId and quantity field")
    } 
 
})

}else{
    throw new BadRequestError("shoppingCart or user field isn't found in request body")
}
const newPurchase = await Store.purchaseOrder()
        lines.push(`Before taxes, the subtotal was $${total.toFixed(2)}`)
        lines.push(`After taxes and fees were applied, the total comes out to $${(total * 1.0875).toFixed(2)}`)
const purchase ={
    id: newPurchase.length + 1,
    name: user.name,
    email: user.email,
    order: shoppingCart,
    total: (total * 1.0875).toFixed(2),
    createdAt: new Date().toISOString(),
    receipt: {lines: lines},
    totalQuantity: totalQuantity,
    productNames: productNames,
    productPrices: productPrices
}

    return res.status(201).json({"purchase": purchase})
}catch(err){
    next(err)
}
})
 

module.exports = router