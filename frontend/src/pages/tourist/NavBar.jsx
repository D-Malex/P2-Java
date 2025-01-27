import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 
import "./styles/NavBar.css";

const NavBar = () => {
  
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleLogout = () => {
    // Eliminar los items del localStorage
    localStorage.removeItem("authToken"); // Cambié "token" a "authToken" para que coincida con el código de login
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");

    // Redirigir al login
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/home">
          <img src="../../../public/columbia-viajesv2.png" alt="Logo" />
        </a>
      </div>

      <div className="navbar-links">
        <Link to="/home"><b>Inicio</b></Link>
        <Link to="/trips"><b>Mis viajes</b></Link>
        <Link to="/profile"><b>Perfil</b></Link>
        <Link to="/about-us"><b>Nosotros</b></Link>
        <Link to="/sucursales"><b>Contacto</b></Link>
      </div>
      <div id="navbar-logout">
        <button id="logout-button" onClick={handleLogout}> 
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
