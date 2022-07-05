import * as React from "react"
import "./Home.css"
import ProductGrid from "../Products/ProductGrid"
import Hero from "../Hero/Hero";
import Search from "../Search/Search";
export default function Home(props) {
  const [category, setCategory] = React.useState('all');
  const [searchBar, setSearchBar]= React.useState('');

  return (
    <div className="home" id="home">
      <Hero/>
      <Search searchBar={searchBar} setSearchBar={setSearchBar} setCategory={setCategory}/>
      <h2>Products:</h2>
      <ProductGrid category={category} searchBar={searchBar} products={props.products} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart} shoppingCart={props.shoppingCart}/>
      </div>
  )
}
