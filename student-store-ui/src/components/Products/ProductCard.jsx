

import * as React from "react"
import "./ProductCard.css"
import { Link } from "react-router-dom"

export default function ProductCard({ handleDisplayItemOnClick, handleAddItemToCart, handleRemoveItemFromCart, imgSrc, name, price, id }) {
    return (
        <div className="product-card" key={id} onClick={handleDisplayItemOnClick}>
            <Link to={"/products/" + id}>
                <div className="image">
                    <img src={imgSrc}></img>
                </div>
            </Link>
            <div className="description">
                <Link to={"/products/" + id} style={{ textDecoration: 'none' }}>
                    <h1 className="product-name"> {name}</h1>
                </Link>
                <div className="price-add">
                    <h2 className="product-price"> ${price} </h2>
                    <span>
                        <i className="remove material-icons md-48" onClick={handleRemoveItemFromCart}> remove </i>
                        <i className="add material-icons md-48" onClick={handleAddItemToCart}> add </i>
                    </span>
                </div>
            </div>

        </div>
    )
}
