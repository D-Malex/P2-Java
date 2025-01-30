import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import api from "../../utils/api";
import "./styles/Home.css";

function Home() {
  const [branches, setBranches] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/sucursales");
        console.log("Se trajeron exitosamente las sucursales.");
        setBranches(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <>
      <div className="hero-section">
        <h1>Hola, {usuario.nombre}</h1>
      </div>

      <section className="about-us">
        <h2>Sobre Nosotros</h2>
        <p>
          Nuestra misión es proporcionar experiencias únicas e inolvidables a
          través de viajes personalizados. Queremos conectar personas con los
          lugares más hermosos del mundo.
        </p>
        <p>
          Desde 1964 cumpliendo el sueño de muchos viajeros! 
          Asesoramiento personalizado por profesionales expertos en viajes.
        </p>
      </section>

      <section className="branches">
        <h2>¿Donde podes encontrarnos?</h2>

        <div className="cards-container">
          {branches.map((branch) => (
            <div className="card" key={branch.id_sucursal}>
              <div className="map-icon-container">
              <FaMapMarkerAlt className="map-icon" />
            </div>
              <h3>{`Sucursal ${branch.id_sucursal}`}</h3>
              <p><b>Dirección:</b> {branch.direccion}</p>
              <p><b>Teléfono:</b> {branch.telefono}</p>
            </div>
          ))}
        </div>

        <button className="view-more" onClick={() => (window.location.href = "/sucursales")}>
          Ver más sucursales
        </button>
      </section>
    </>
  );
}

export default Home;
