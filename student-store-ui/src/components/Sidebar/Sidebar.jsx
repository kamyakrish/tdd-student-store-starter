import * as React from "react"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import "./Sidebar.css"
export default function Sidebar(props) {
  return (
    <section className={`sidebar ${props.isOpen ? `open`: `closed`}`}>
        <button className="toggle-button" onClick={props.handleOnToggle}><img src="../src/arrow.png" alt="arrow" id="toggle-image"/>
          <i className={`arrow-right arrow ${props.isOpen ? `closed` : `open`}`}></i>
        </button>
      <button className="toggle-button" onClick={props.handleOnToggle}><img src="../src/shopping_cart.png" alt="Shopping Cart" id="toggle-image"/></button>
      <button className={props.isOpen ? "closed" : "checkout-Btn"}><img src="../src/dollar_sign.png" alt="Dollar Sign" id="toggle-image"/></button>
      <button className={props.isOpen ? "closed" : "checkout-Btn"}><img src="../src/checklist.png" alt="checklist" id="toggle-image"/></button>
      <ShoppingCart isOpen={props.isOpen} setIsOpen={props.setIsOpen} products={props.products} shoppingCart={props.shoppingCart} checkOutForm={props.checkOutForm} handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm} order={props.order} makeReceipt={props.makeReceipt} setMakeReceipt={props.setMakeReceipt} checkingOutError={props.checkingOutError}/>
    </section>
  )

}
