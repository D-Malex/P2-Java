import React, { useEffect, useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import api from "../../utils/api";
import "./styles/Viajes.css";

const Viajes = () => {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const response = await api.get("/viajes");
        setViajes(response.data);
        console.log("Se obtuvieron exitosamente los viajes.");
      } catch (error) {
        console.error("Error al obtener los viajes:", error);
      }
    };

    obtenerViajes();
  }, []);

  const esProximo = (fechaLlegada) => {
    const fechaActual = new Date();
    const fechaViaje = new Date(fechaLlegada);
    return fechaViaje > fechaActual;
  };

  return (
    <>
      <h1 id="viajes-title">Lista de Viajes</h1>
      <div className="viajes-container">
        {viajes.map((viaje) => (
          <div key={viaje.id_viaje} className="viaje-card">
            <div className="plane-icon-container">
              <FaPlaneDeparture className="plane-icon" />
            </div>
            {esProximo(viaje.fechaLlegada) && (<p className="proximo-viaje">PROXIMO</p>)}
            <p><strong>Sucursal:</strong> {viaje.sucursal.direccion} ({viaje.sucursal.email})</p>
            <p><strong>Hotel:</strong> {viaje.hotel.nombre}</p>
            <p><strong>Pensión:</strong> {viaje.pensionHotel}</p>
            <p><strong>Vuelo:</strong> {viaje.vuelo.origen} → {viaje.vuelo.destino}</p>
            <p><strong>Clase de Vuelo:</strong> {viaje.claseVuelo}</p>
            <p><strong>Fecha de Llegada:</strong> {viaje.fechaLlegada}</p>
            <p><strong>Fecha de Retorno:</strong> {viaje.fechaRetorno}</p>
            <p><strong>Precio:</strong> ${viaje.precio}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Viajes;
