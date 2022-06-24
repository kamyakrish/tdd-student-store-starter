import * as React from "react"
import "./Contact.css"

export default function Contact(){
    return(
      <div className="contact" id="contact">
        <div className="content">
          <h2>Contact Us</h2>
          <div className="summary">
            <ul className="info">
              <li>
                <span className="label">Email:</span>
                <span>code@path.org</span>
              </li>
              <li>
                <span className="label">Phone:</span>
                <span>1-800-CODEPATH</span>
              </li>
              <li>
                <span className="label">Address:</span>
                <span>123 Fake Street, San Francisco, CA</span>
              </li>
              <li>
                <span className="label">Socials:</span>
                <span>
                <a href="https://www.facebook.com/codepath.org/" target="_blank" className="contact-fb"><i className="fa-brands fa-facebook-square"></i></a>
                <a href="https://www.instagram.com/codepathorg/?hl=en" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/school/codepath-org/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                  <a href="https://twitter.com/codepath?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                </span>
              </li>
            </ul>
            <div className="media">
              <img src="../src/happy.png" alt="happy person pic" />
            </div>
          </div>
        </div>
      </div>
    )
  }
