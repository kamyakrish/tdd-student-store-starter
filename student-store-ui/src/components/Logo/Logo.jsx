import * as React from "react"
import {Link} from 'react-router-dom'

export default function Logo(){
    return (
        <nav className="logo">
        <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVuqsRX__sah-RrnPxDtyrAx0dp_lFC5bkxBqL91bN1odDL4jPhsfOIdG5r-szVDdFLs&usqp=CAU" alt="store logo" id="logo-img"/></Link>
    </nav>
  )

}
