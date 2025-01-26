import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer";
import api from "../../utils/api";
import './styles/Hoteles.css'; 

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    // Realizamos la petición para obtener los hoteles
    api.get("/hoteles")
      .then((response) => {
        // Si la respuesta tiene una propiedad de datos
        return response.data ? response.data : response;  // Asegúrate de que 'response.data' es el formato esperado
      })
      .then((data) => setHoteles(data))
      .catch((error) => console.error("Error al obtener los hoteles:", error));
  }, []);

  const handleCardClick = () => {
    // Redirige a la página /hotels con el id del hotel
    navigate(`/sales`);
  };

  return (
    <div>
      <NavBar />
      <h1>Hoteles exclusivos</h1>
      <div className="hoteles-container"> 
        {hoteles.map((hotel) => (
          <div 
            key={hotel.id_hotel} 
            className="hotel-card" 
            onClick={() => handleCardClick(hotel.id_hotel)}
          >
            <h3>{hotel.nombre}</h3>
            <p><b>Ubicación:</b> {hotel.ciudad}, {hotel.direccion}</p>
            <p><b>Telefono:</b> {hotel.telefono}</p>
            <p>Habitaciones disponibles: {hotel.plazasDisponibles}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>    
  );
};

export default Hoteles;
