import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import './styles/Hoteles.css'; 

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/hoteles")
      .then((response) => { return response.data ? response.data : response;})
      .then((data) => setHoteles(data))
      .catch((error) => console.error("Error al obtener los hoteles:", error));
  }, []);

  return (
    <>
      <h1 id="seller-hoteles-title">Hoteles exclusivos</h1>
      <div className="hoteles-container"> 
        {hoteles.map((hotel) => (
          <div key={hotel._id} className="hotel-card" onClick={() => { navigate(`/sales`)}}>
            <h3>{hotel.nombre}</h3>
            <p><b>Ubicación:</b> {hotel.ciudad}, {hotel.direccion}</p>
            <p><b>Telefono:</b> {hotel.telefono}</p>
            <p>Habitaciones disponibles: {hotel.plazasDisponibles}</p>
          </div>
        ))}
      </div>
    </>    
  );
};

export default Hoteles;
