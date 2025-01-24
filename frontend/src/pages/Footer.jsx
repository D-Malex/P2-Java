import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2>Contacto</h2>
      <p>Email: contacto@columbiaviajes.com</p>
      <p>Teléfono: +54 123-456-789</p>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i> Facebook
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-x-twitter"></i> Twitter
        </a>
      </div>
    </footer>
  );
}

export default Footer;
