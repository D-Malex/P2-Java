import React, { useEffect, useState } from "react"; // Agregar los hooks necesarios
import NavBar from "./NavBar";
import Footer from "../Footer";
import api from "../../utils/api";
import "./styles/Home.css";

function Home() {
  const [branches, setBranches] = useState([]); // Estado para las sucursales

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/sucursales"); // Llamada a la API
        setBranches(response.data.slice(0, 3)); // Seleccionar las primeras 3 sucursales
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
      }
    };

    fetchBranches();
  }, []); // [] para que se ejecute solo una vez

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
          {branches.map((branch) => (
            <div className="card" key={branch.id_Sucursal}>
              <img
                src={`sucursal${branch.id_sucursal}.jpg`} // Suposición de imágenes nombradas por ID
                alt={`Sucursal ${branch.id_sucursal}`}
              />
              <h3>{`Sucursal ${branch.id_sucursal}`}</h3>
              <p>Dirección: {branch.direccion}</p>
              <p>Teléfono: {branch.telefono}</p>
            </div>
          ))}
        </div>
        <button
          className="view-more"
          onClick={() => (window.location.href = "/sucursales")}
        >
          Ver más sucursales
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
