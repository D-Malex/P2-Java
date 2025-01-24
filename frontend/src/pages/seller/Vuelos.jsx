import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer";
import api from "../../utils/api";
import './styles/Vuelos.css'; 

const Vuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    // Realizamos la petición para obtener los vuelos
    api.get("/vuelos")
      .then((response) => {
        // Si la respuesta tiene una propiedad de datos
        return response.data ? response.data : response;  // Asegúrate de que 'response.data' es el formato esperado
      })
      .then((data) => setVuelos(data))
      .catch((error) => console.error("Error al obtener los vuelos:", error));
  }, []);

  const handleCardClick = (vueloId) => {
    // Redirige a la página /sells con el id del vuelo
    navigate(`/sells/${vueloId}`);
  };

  return (
    <div>
      <NavBar />
        <div className="vuelos-container"> 
          {vuelos.map((vuelo) => (
            <div key={vuelo.id_vuelo} className="vuelo-card" onClick={() => handleCardClick(vuelo.id_vuelo)} >
              <h3>{vuelo.destino}</h3>
              <p>Fecha: {new Date(vuelo.fecha).toLocaleDateString()}</p>
              <p>Origen: {vuelo.origen}</p>
              <p>Plazas Totales: {vuelo.plazasTotales}</p>
            </div>
          ))}
        </div>
     <Footer />
    </div>    
  );
};

export default Vuelos;
