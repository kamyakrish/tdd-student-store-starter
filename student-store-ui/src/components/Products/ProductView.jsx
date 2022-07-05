
import ProductCard from "./ProductCard"
import "./ProductView.css"

export default function ProductView(props) {
    const product = props.product
    return (
        <div className="product-view">
            <h1 className="product-id">Product #{product.id}</h1>
            <ProductCard key={product.id} product={product} productId={product.id} quantity={props.shoppingCart[product.id] || 0} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}
            showDescription={true}
            shoppingCart={props.shoppingCart}/>
        </div>
    )
}
