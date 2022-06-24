

import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <div className="content">
      <h3> Home </h3>
      <h3> About Us </h3>
      <h3> Contact Us </h3>
      <h3> Buy Now </h3>
      </div>
    </nav>
  )
}
