import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'
import ProductDetail from "../Products/ProductDetail"
import NotFound from "../NotFound"
import Footer from "../Footer/Footer"
import About from "../About/About"
import Contact from "../Contact/Contact"
export default function App() {
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [checkingOutError, setCheckingOutError]=React.useState("")
  const[checkOutForm, setCheckOutForm] = React.useState({name:"", email: ""})
  const [isOpen, setIsOpen] = React.useState(false); //tells us if sidebar is in the open or closed state
  const [shoppingCart, setShoppingCart] = React.useState({}); //Each object in the array should have two fields: itemId which stores the id of the item being purchased
  //The `quantity` field should store a number representing how many of that item the user is purchasing.
  const[makeReceipt, setMakeReceipt] = React.useState(false)
  const[order, setOrder]=React.useState({})
  const[success, setSuccess] = React.useState(false);
  //`checkoutForm` - the user's information that will be sent to the API when they checkout

  React.useEffect(()=>{
    async function fetchItems(){
      setIsFetching(true);
      try{
       const response = await axios.get("http://localhost:3001/store");
          console.log("App.jsx tries", response?.data?.products);
          const posts = response?.data?.products
          if(posts){
            setProducts(posts);
          }
        }catch(err){
        console.log(err.response);
        setError(err.response);
      } finally{
        setIsFetching(false);
      }
      }
      fetchItems();
    }, []);

    if(isFetching){
      return <h1>Loading ... </h1>
    }


  function handleOnToggle(){
    //should toggle the open/closed state of the `Sidebar`
    setIsOpen(prev => !prev)
  }

  function handleAddItemToCart(productId){
    if(shoppingCart.hasOwnProperty(productId)){
      setShoppingCart((prevCart)=>
      ({...prevCart, [productId]:prevCart[productId] +1}))
    }
    else{
      setShoppingCart((prevCart) =>
      ({...prevCart, [productId]:1}))
  } setCheckingOutError("")
//It should accept a single argument - `productId`
//Should add that product to the `shoppingCart` if it doesn't exist, and set its quantity to `1`
//If it does exist, it should increase the quantity by `1`
//It should add the price of the product to the total price of the `shoppingCart`.
  }
  function handleRemoveItemFromCart(productId){
   const nCart = {...shoppingCart, [productId]:shoppingCart[productId]-1}
    if(nCart[productId]=== 0){
      delete nCart[productId]
    }
    setShoppingCart(nCart)
    console.log(shoppingCart)
   // should accept a single argument - `productId`
   //should decrease the quantity of the item in the `shoppingCart` by `1`, but only if it already exists.
   //If it doesn't exist, the function should do nothing.
   //If the new quantity is `0`, it should remove the item from the `shoppingCart`
  }
  function handleOnCheckoutFormChange(name, value){
    let newForm = {...checkOutForm}
    newForm[name] = value
    setCheckOutForm(newForm)
    setCheckingOutError("")
  //It should receive two arguments:
  //`name` - the `name` attribute of the input being
  //`value` - the new value to set for that input
  //should update the `checkoutForm` object with the new value from the correct input(s)
  }
  function handleOnSubmitCheckoutForm(){
    let shopArray = []
    if(Object.keys(shoppingCart).length === 0){
      setCheckingOutError("item")
      return;
    } if(checkOutForm.name === "" || checkOutForm.email === ""){
      setCheckingOutError("field")
      return;
    }
    for(const item in shoppingCart){
      shopArray.push({itemId: item, quantity:shoppingCart[item]})
    } axios.post("http://localhost:3001/store",
    {
      user:{
      name: checkOutForm.name,
      email: checkOutForm.email
    },
    shoppingCart: shopArray
  }).then(res =>{
    setShoppingCart({})
    setCheckOutForm({name:"", email:""})
    setSuccess(true)
    setMakeReceipt(true)
    setOrder(res.data.purchase)
  })
  //It should submit the user's order to the API
  //To submit the user's order, it should leverage the `axios.post` method to send a `POST` request to the `/store` endpoint.
  }
  return (
    <div className="app">
      <BrowserRouter>
        <main>
        <Navbar/>
        <Sidebar success={success} isOpen={isOpen} shoppingCart={shoppingCart} products={products}
        checkOutForm={checkOutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        handleOnToggle={handleOnToggle} setIsOpen={setIsOpen} order={order} makeReceipt={makeReceipt} setMakeReceipt={setMakeReceipt}
        checkingOutError={checkingOutError}/>
          <Routes>
            <Route path="/" element={<Home isFetching={isFetching} handleAddItemToCart={handleAddItemToCart} products={products} handleRemoveItemFromCart={handleRemoveItemFromCart} setIsOpen={setIsOpen} shoppingCart={shoppingCart}/>} />
            <Route path="/products/:productId" element={<ProductDetail isFetching={isFetching} setIsFetching={setIsFetching}
               handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} setError={setError} shoppingCart={shoppingCart}/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <About/>
          <Contact/>
          <Footer/>
        </main>
      </BrowserRouter>
    </div>
  )
}
