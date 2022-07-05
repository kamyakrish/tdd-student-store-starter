import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="content">
        <Logo />
        <ul className="links">
          <button><a href="#home">Home</a></button>
          <button><a href="#about">About Us</a></button> 
          <button><a href="#contact">Contact Us</a></button> 
          <button><a href="#buy">Buy Now</a></button> 
      </ul>
      </div>
    </nav>
  )
}

