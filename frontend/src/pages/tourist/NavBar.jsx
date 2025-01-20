import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../../../public/columbia-viajesv2.png" alt="Logo" />
      </div>

      <div className="navbar-links">
        <Link to="/home">Inicio</Link>
        <Link to="/my-trips">Mis viajes</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/about-us">Nosotros</Link>
        <Link to="/contact">Contacto</Link>
      </div>
    </nav>
  );
};

export default NavBar;
