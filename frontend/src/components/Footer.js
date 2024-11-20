import React, { memo } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Footer.css"; // Import external CSS file

const photo1 = "https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
const photo2 = "https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
const photo3 = "https://images.pexels.com/photos/1721637/pexels-photo-1721637.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
const photo4 =  "https://images.unsplash.com/photo-1598190896090-9dc5c70361d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8aW5kaWElMjB0cmF2ZWx8fDB8fHx8MTYzMTY3NTgyMQ&ixlib=rb-1.2.1&q=80&w=1080"
const photo5 = "https://i.pinimg.com/originals/9c/6b/44/9c6b44a17bad86390cc565285f6a934a.jpg"
const photo6 = "https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-for-Places-To-Visit-In-Gujarat-In-May_30th-Jan.jpg"
// Social media links
const socialLinks = [
  { href: "https://x.com/i/flow/login?redirect_after_login=%2Fdaiictofficial", icon: "fab fa-twitter" },
  { href: "https://www.facebook.com/DAIICT/", icon: "fab fa-facebook-f" },
  { href: "https://www.instagram.com/daiictofficial/?hl=en", icon: "fab fa-instagram" },
  { href: "https://in.linkedin.com/school/dhirubhai-ambani-institute-of-information-and-communication-technology/", icon: "fab fa-linkedin-in" },
];

const Footer = memo(() => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        {/* Company Section */}
        <div className="col-lg-3 col-md-6 mb-4 footer-section">
          <h5 className="footer-heading">Company</h5>
          <ul className="footer-list">
            <li><Link to="/about-us" className="footer-link">About Us</Link></li>
            
            <li><Link to="/review" className="footer-link">Reviews</Link></li>
            <li><Link to="/" className="footer-link">Home</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="col-lg-3 col-md-6 mb-4 footer-section">
          <h5 className="footer-heading">Contact us</h5>
          <p className="footer-text">
            <i className="fas fa-map-marker-alt"></i> DA-IICT, Gandhinagar, India <br />
            <i className="fas fa-phone"></i> +123 456 7890 <br />
            <i className="fas fa-envelope"></i> daiict.ac.in
          </p>
          <div className="social-media">
            {socialLinks.map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="col-lg-3 col-md-6 mb-4 footer-section">
          <h5 className="footer-heading">Gallery</h5>
          <div className="gallery-images">
            {[photo1, photo2, photo3, photo4, photo5, photo6].map((photo, index) => (
              <img key={index} src={photo} alt={`Gallery Image ${index + 1}`} className="gallery-image" loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p className="footer-text">&copy; Wanderways, All Rights Reserved.</p>
      <a href="#top" className="back-to-top">↑</a>
    </div>
  </footer>
));

export default Footer;
