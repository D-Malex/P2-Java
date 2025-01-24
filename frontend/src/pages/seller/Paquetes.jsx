import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import NavBar from "./NavBar";
import Footer from "../Footer";
import "./styles/Paquetes.css";

const Paquetes = () => {
  const [paquetes, setPaquetes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        const response = await api.get("/paquetes");
        setPaquetes(response.data);
      } catch (err) {
        console.error("Error al cargar paquetes:", err);
        setError("No se pudieron cargar los paquetes. Intenta más tarde.");
      }
    };

    fetchPaquetes();
  }, []);

  return (
    <div className="paquetes-container">
      <NavBar />
      <h2>Paquetes de Viaje</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="paquetes-grid">
        {paquetes.map((paquete, index) => (
          <div className="paquete-card" key={index}>
            <img
              src={`https://source.unsplash.com/300x200/?travel,${paquete.hotel.ciudad}`}
              alt={`Imagen de ${paquete.hotel.nombre}`}
              className="paquete-img"
            />
            <div className="paquete-info">
              <h3>{paquete.hotel.nombre}</h3>
              <p><strong>Origen:</strong> {paquete.vuelo.origen}</p>
              <p><strong>Destino:</strong> {paquete.vuelo.destino}</p>
              <p><strong>Fecha de Vuelo:</strong> {paquete.vuelo.fecha}</p>
              <p><strong>Hotel:</strong> {paquete.hotel.nombre}</p>
              <p><strong>Ciudad:</strong> {paquete.hotel.ciudad}, {paquete.hotel.direccion}</p>
              <p><strong>Plazas disponibles del hotel:</strong> {paquete.hotel.plazasDisponibles}</p>
              <p><strong>Plazas disponibles del vuelo:</strong> {paquete.vuelo.plazasTotales}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Paquetes;
