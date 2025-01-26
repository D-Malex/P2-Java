import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 
import "./styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/home"> <img src="../../../public/columbia-viajesv2.png" alt="Logo"/> </a>
      </div>

      <div className="navbar-links">
        <Link to="/home"><b>Inicio</b></Link>
        <Link to="/sucursales"><b>Sucursales</b></Link>
        <Link to="/hotels"><b>Hoteles</b></Link>
        <Link to="/flights"><b>Vuelos</b></Link>
        <Link to="/sellers"><b>Vendedores</b></Link>
        <Link to="/profile"><b>Perfil</b></Link>
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
