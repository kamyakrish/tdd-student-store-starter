import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm(props) {
    var error = <p className="checkout-error"></p>;
    if (props.checkingOutError === "item") {
        error = <p className="checkout-error">No items in cart found to checkout.</p>
    }
    if (props.checkingOutError === "field") {
        error = <p className="checkout-error">User info must include an email and name.</p>
    }

    return (
        <div className="checkout-form">
            <h3>Payment Info </h3>
            <div className="input-field">
                <label className="label">Name</label>
                <div className="control">
                    <input value={props.checkOutForm} onChange={(e) => props.handleOnCheckoutFormChange("name", e.target.value)} 
                    type="text" name="name" className="checkout-form-input" placeholder="Student Name" />
                </div>
            </div>
            <div className="input-field">
            <label className="label">Email</label>
                <div className="control">
                    <input value={props.checkOutForm} onChange={(e) => props.handleOnCheckoutFormChange("email", e.target.value)}
                    type="email" name="email" className="checkout-form-input" placeholder="studentemail@codepath.org" />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" name="termsAndConditions"/>
                        <span className="label">
                            I agree to the <a href="#terms-and-conditions">terms and conditions</a>
                        </span>
                    </label>
                </div>
            </div>
            {props.success ? <p className="success">Success!!</p> : error}
            <div className="field">
                <div className="control">
                    <button className="button checkout-button" onClick={props.handleOnSubmitCheckoutForm}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

