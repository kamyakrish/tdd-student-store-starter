import * as React from "react"
import "./ProductCard.css"
import { Link } from "react-router-dom"

export default function ProductCard(props) {
  const product = props.product
  return (
    <div className="product-card">
        <Link to={"products/" + product.id}>
        <img id="product-poster" src={product.image}/>
        </Link>
        <div className="product-info">
          <div className="details">
          <p className="product-name">{product.name}</p>
        <p className="product-price">${product.price}</p>
        </div>
        {props.showDescription &&
            <p className="product-description">{product.description}</p>
        } 
          <div className="actions">
          <div className="shop-btns">
          <button type="button" className="add" onClick={() => props.handleAddItemToCart(product.id)}><i className="material-icons">+</i></button>
          <button type="button" className="remove" disabled={props.quantity === 0 ? true : false} onClick={() => props.handleRemoveItemFromCart(product.id)}><i className="material-icons remove-btn">-</i></button>
          </div>
          <span className="quantity">
            {props.quantity === 0 ? <span className="amt hide">{props.quantity}</span> : <span className="amt">{props.quantity}</span>}
          </span>
    </div>
    </div>
    </div>
  )}
