import React from "react";
import NavBar from "./NavBar";
import "./styles/Home.css";
import "./styles/NavBar.css";

function Home() {
  return (
    <div className="container">
      <NavBar />
      <div className="hero-section">
        <h1 className="hero-title">Welcome, TOURIST</h1>
      </div>

      <section className="about-us">
        <h2>Sobre Nosotros</h2>
        <p>
          Nuestra misión es proporcionar experiencias únicas e inolvidables a
          través de viajes personalizados. Queremos conectar personas con los
          lugares más hermosos del mundo.
        </p>
      </section>

      <section className="branches">
        <h2>Sucursales</h2>
        <div className="cards-container">
          {/* Tarjetas de sucursales */}
          <div className="card">
            <img src="sucursal1.jpg" alt="Sucursal 1" />
            <h3>Sucursal 1</h3>
            <p>Dirección: Calle Falsa 123</p>
            <p>Teléfono: 123-456-7890</p>
          </div>
          <div className="card">
            <img src="sucursal2.jpg" alt="Sucursal 2" />
            <h3>Sucursal 2</h3>
            <p>Dirección: Av. Principal 456</p>
            <p>Teléfono: 987-654-3210</p>
          </div>
          <div className="card">
            <img src="sucursal3.jpg" alt="Sucursal 3" />
            <h3>Sucursal 3</h3>
            <p>Dirección: Plaza Central 789</p>
            <p>Teléfono: 456-789-0123</p>
          </div>
        </div>
        <button
          className="view-more"
          onClick={() => (window.location.href = "/sucursales")}
        >
          Ver más sucursales
        </button>
      </section>

      <footer className="footer">
        <h2>Contacto</h2>
        <p>Email: contacto@columbiaviajes.com</p>
        <p>Teléfono: +54 123-456-789</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
