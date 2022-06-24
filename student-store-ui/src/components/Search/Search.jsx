import * as React from "react"
import "./Search.css"
export default function Search(props) {

    const setByButton = (c)=>{
        props.setCategory(c);
    }

  return (
    <div className="search">
        <div className="search-input">
        <label htmlFor="productSearch"></label>
                <input
                    name="searching"
                    type="text"
                    placeholder="Search"
                    value={props.searchBar}
                    onChange={(e) => props.setSearchBar(e.target.value)}
                    />
            </div>
            <div className="product-categories">
                <button id="all" onClick={(e) => {
                    setByButton(e.target.id);
                }}>All Categories</button>
                <button id="food" onClick={(e) => {
                    setByButton(e.target.id);
                }}>Food</button>
                <button id="clothing" onClick={(e) => {
                    setByButton(e.target.id);
                }}>Clothing</button>
                <button id="accessories" onClick={(e) => {
                    setByButton(e.target.id);
                }}>Accessories</button>
                <button id="tech" onClick={(e) => {
                    setByButton(e.target.id);
                }}>Tech</button>
            </div>
        </div>

    )
}
