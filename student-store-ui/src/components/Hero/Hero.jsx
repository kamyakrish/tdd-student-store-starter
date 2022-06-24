import * as React from "react"

export default function Hero() {
  return (
   <div className="hero">
      <h1 className="intro">Welcome! Find your merch!</h1>
      <p className="paragraph"> We have all kinds of goodies. Click on any of the items to start filling up your shopping cart. Checkout whenever you're ready.</p>
      <img className="hero-img" src="../src/hero.svg" width={300} height={200}/>
      </div>
  )
}
