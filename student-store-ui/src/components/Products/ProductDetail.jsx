import * as React from "react"
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import axios from "axios";
import ProductView from "./ProductView";

export default function ProductDetail({ handleAddItemToCart, handleRemoveItemFromCart, isFetching = true, setIsFetching = () => { }, error, setError = () => { }, shoppingCart, quantity }) {
  const [product, setProduct] = React.useState({})
  const {productId} = useParams()
  React.useEffect(() => axios.get("https://codepath-store-api.herokuapp.com/store/" + productId)
    .then((response) => {
      setIsFetching(false)
      setProduct(response.data.product)
    })
    .catch((error) => {
      setIsFetching(false)
      setError(error)
      console.log(error)
      return <NotFound />
    }), [])


  return(

    <div className="product-detail">
      {isFetching && <h1 className="loading">Loading...</h1>}
        {!error && <ProductView product={product} productId={productId}
          handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} shoppingCart={shoppingCart} />}
        {error && <NotFound />}
    </div>
  )
}
