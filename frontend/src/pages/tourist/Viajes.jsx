import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./styles/Viajes.css";

const Viajes = () => {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    // Simulando la petición fetch para obtener los viajes
    const obtenerViajes = async () => {
      try {
        const response = await api.get("/viajes");
        setViajes(response.data);
        console.log("data: ", response.data);
      } catch (error) {
        console.error("Error al obtener los viajes:", error);
      }
    };

    obtenerViajes();
  }, []);

  // Función para comprobar si el viaje es próximo
  const esProximo = (fechaLlegada) => {
    const fechaActual = new Date();
    const fechaViaje = new Date(fechaLlegada);
    return fechaViaje > fechaActual; // Si la fecha de llegada es posterior a la actual
  };

  return (
    <div>
      <h1>Lista de Viajes</h1>
      <div className="viajes-container">
        {viajes.map((viaje) => (
          <div key={viaje.id_viaje} className="viaje-card">
            {/* Aquí puedes cambiar la imagen por algo relacionado con cada viaje */}
            <img
              src={viaje.imagen || "default-image.jpg"} // Ruta a la imagen
              alt={`Viaje ${viaje.id_viaje}`}
              className="viaje-image"
            />
            {esProximo(viaje.fechaLlegada) && (
              <p className="proximo-viaje">PROXIMO</p> // Mostrar texto en rojo si es un viaje próximo
            )}
            <p><strong>Sucursal:</strong> {viaje.sucursal.direccion} ({viaje.sucursal.email})</p>
            <p><strong>Turista:</strong> {viaje.usuario.nombre} {viaje.usuario.apellido} ({viaje.usuario.email})</p>
            <p><strong>Hotel:</strong> {viaje.hotel.nombre} - {viaje.hotel.ciudad}</p>
            <p><strong>Pensión:</strong> {viaje.pensionHotel}</p>
            <p><strong>Vuelo:</strong> {viaje.vuelo.origen} → {viaje.vuelo.destino}</p>
            <p><strong>Clase de Vuelo:</strong> {viaje.claseVuelo}</p>
            <p><strong>Fecha de Llegada:</strong> {viaje.fechaLlegada}</p>
            <p><strong>Fecha de Retorno:</strong> {viaje.fechaRetorno}</p>
            <p><strong>Precio:</strong> ${viaje.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viajes;
