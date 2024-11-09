import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom"; // Import Link from react-router-dom

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

const Footer = () => {
  return (
    <footer className="footer" style={styles.footer}>
      <div className="container">
        <div className="row">
          {/* Company Section */}

          <div className="col-lg-3 col-md-6 mb-4" style={styles.footerSection}>
            <h5 style={styles.heading}>Company</h5>

            <ul style={styles.list}>
              {/* Updated About Us Link */}

              <li>
                <Link to="/about-us" style={styles.link}>
                  About Us
                </Link>
              </li>

              <li>
                <a href="#" style={styles.link}>
                  FAQs & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}

          <div className="col-lg-3 col-md-6 mb-4" style={styles.footerSection}>
            <h5 style={styles.heading}>Contact us</h5>

            <p style={styles.text}>
              <i className="fas fa-map-marker-alt"></i> DA-IICT, Gandhinagar,
              India
              <br />
              <i className="fas fa-phone"></i> +123 456 7890
              <br />
              <i className="fas fa-envelope"></i> daiict.ac.in
            </p>
            <div style={styles.socialMedia}>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2Fdaiictofficial" target="_blank" rel="noopener noreferrer">
                <i
                  className="fab fa-twitter"
                  style={{ ...styles.icon, marginRight: "10px" }}
                >
                  {" "}
                </i>
              </a>
              <a href="https://www.facebook.com/DAIICT/" target="_blank" rel="noopener noreferrer">
                <i
                  className="fab fa-facebook-f"
                  style={{ ...styles.icon, marginRight: "10px" }}
                >
                  {" "}
                </i>
              </a>
              <a href="https://www.instagram.com/daiictofficial/?hl=en" target="_blank" rel="noopener noreferrer">
                <i
                  className="fab fa-instagram"
                  style={{ ...styles.icon, marginRight: "10px" }}
                >
                  {" "}
                </i>
              </a>
              <a href="https://in.linkedin.com/school/dhirubhai-ambani-institute-of-information-and-communication-technology/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in" style={styles.icon}>
                  {" "}
                </i>
              </a>
            </div>
          </div>

          {/* Gallery Section */}

          <div className="col-lg-3 col-md-6 mb-4" style={styles.footerSection}>
            <h5 style={styles.heading}>Gallery</h5>

            <div style={styles.galleryImages}>
              {/* Updated to use imported images */}

              <img
                src={photo1}
                alt="Gallery Image 1"
                style={styles.galleryImage}
              />
              <img
                src={photo2}
                alt="Gallery Image 2"
                style={styles.galleryImage}
              />
              <img
                src={photo3}
                alt="Gallery Image 3"
                style={styles.galleryImage}
              />
              <img
                src={photo4}
                alt="Gallery Image 4"
                style={styles.galleryImage}
              />
              <img
                src={photo5}
                alt="Gallery Image 5"
                style={styles.galleryImage}
              />
              <img
                src={photo6}
                alt="Gallery Image 6"
                style={styles.galleryImage}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p style={styles.footerText}>&copy; Wanderways, All Rights Reserved.</p>

        <a href="#top" style={styles.backToTop}>
          ↑
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "40px 0",
  },

  footerSection: {
    padding: "0 15px",
    marginBottom: "30px", // Added margin for spacing between sections
  },

  heading: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "1rem",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  link: {
    color: "#ddd",
    textDecoration: "none",
    display: "block",
    padding: "5px 0",
  },

  text: {
    color: "#bbb",
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },

  galleryImages: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px", // Reduced gap for a more compact layout
  },

  galleryImage: {
    width: "100%",
    height: "80px", // Decreased height of images
    objectFit: "cover", // Ensures images fill the space without distortion
    borderRadius: "5px",
  },

  footerBottom: {
    borderTop: "1px solid #444",
    paddingTop: "15px",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "-40px", // Adjusted margin for spacing
  },

  footerText: {
    fontSize: "0.9rem",
    color: "#bbb",
  },

  backToTop: {
    color: "#28a745",
    fontSize: "1.2rem",
    textDecoration: "none",
    marginLeft: "10px",
  },
};

export default Footer;
