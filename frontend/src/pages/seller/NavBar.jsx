import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 
import "./styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/home"> <img src="../../../public/columbia-viajesv2.png" alt="Logo"/> </a>
      </div>

      <div className="navbar-links">
        <Link to="/home">Inicio</Link>
        <Link to="/packages">Paquetes</Link>
        <Link to="/profile">Mi perfil</Link>
        <Link to="/sucursal">Contacto</Link>
      </div>
      <div className="navbar-logout">
        <button className="logout-button" onClick={handleLogout}> 
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
