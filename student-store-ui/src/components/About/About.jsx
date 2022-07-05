import * as React from "react"
import "./About.css"
export default function About() {
  return (
    <div id="about">
        <div className ="heading">
            <h1>About</h1>
        </div>
        <div className="about">
            <div className="a-text">
                <p>
                    The codepath student store offers great products at great prices
                    from a great team and for a great cause.
                </p>
                <p>
                    We've searching far and wide for items that perk the interests of even
                    the most eccentric students and decided to offer them all here in one place.
                </p>
                <p>
                    All proceeds go towards bringing high quality CS education to college
                    students around the country
                </p>
            </div>
            <div>
                <img id="a-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVuqsRX__sah-RrnPxDtyrAx0dp_lFC5bkxBqL91bN1odDL4jPhsfOIdG5r-szVDdFLs&usqp=CAU" alt="student store logo"/>
            </div>
        </div>
    </div>
  )
}
