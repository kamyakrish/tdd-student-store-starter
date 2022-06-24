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
  const [isOpen, setIsOpen] = React.useState(false);
  const [shoppingCart, setShoppingCart] = React.useState({});
  const[makeReceipt, setMakeReceipt] = React.useState(false)
  const[order, setOrder]=React.useState({})
  const[checkOutForm, setCheckOutForm] = React.useState({
  name:"",
  email: ""
});

  React.useEffect(()=>{
    async function fetchItems(){
      setIsFetching(true);
      try{
       const response = await axios.get("https://codepath-store-api.herokuapp.com/store");
          console.log("App.jsx tries", response?.data?.products);
          if(response?.data?.products){
            setProducts(response?.data?.products);
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

    setIsOpen(prev => !prev)
  }

  function handleAddItemToCart(productId){
    if(shoppingCart.hasOwnProperty(productId)){
      setShoppingCart((prevCart)=> ({...prevCart, [productId]:prevCart[productId] +1}))
    }
    else{
      setShoppingCart((prevCart) => ({...prevCart, [productId]:1}))
  } setCheckingOutError("")

  }
  function handleRemoveItemFromCart(productId){
   const nCart = {...shoppingCart, [productId]:shoppingCart[productId]-1}
    if(nCart[productId]=== 0){
      delete nCart[productId]
    }
    setShoppingCart(nCart)
    console.log(shoppingCart)

  }
  function handleOnCheckoutFormChange(name, value){
    let newForm = {...checkOutForm}
    newForm[name] = value
    setCheckOutForm(newForm)
    setCheckingOutError("")

  }
  function handleOnSubmitCheckoutForm(){

    if(Object.keys(shoppingCart).length === 0){
      setCheckingOutError("item")
      return;
    } if(checkOutForm.name === "" || checkOutForm.email === ""){
      setCheckingOutError("field")
      return;
    } let shopArray = []
    for(const item in shoppingCart){
      shopArray.push({itemId: item, quantity:shoppingCart[item]})
    } axios.post("https://codepath-store-api.herokuapp.com/store",
    {
      user:
      {
      name: checkOutForm.name,
      email: checkOutForm.email
    },
    shoppingCart: shopArray
  }).then(res =>{
    setShoppingCart({})
    setCheckOutForm({name:"", email:""})
    setMakeReceipt(true)
    setOrder(res.data.purchase)
  })

  }
  return (
    <div className="app">
      <BrowserRouter>
        <main>
        <Navbar/>
        <Sidebar isOpen={isOpen} shoppingCart={shoppingCart} products={products} checkOutForm={checkOutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle} setIsOpen={setIsOpen} order={order} makeReceipt={makeReceipt} setMakeReceipt={setMakeReceipt} checkingOutError={checkingOutError}/>
          <Routes>
            <Route path="/" element={<Home isFetching={isFetching} handleAddItemToCart={handleAddItemToCart} products={products} handleRemoveItemFromCart={handleRemoveItemFromCart} setIsOpen={setIsOpen} shoppingCart={shoppingCart}/>} />
            <Route path="/products/:productId" element={<ProductDetail isFetching={isFetching} setIsFetching={setIsFetching}
               handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} setError={setError} shoppingCart={shoppingCart}/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          {}
          <About/>
          <Contact/>
          <Footer/>
        </main>
      </BrowserRouter>
    </div>
  )
}
