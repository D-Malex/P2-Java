import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import './styles/Vuelos.css'; 

const Vuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    api.get("/vuelos").then((response) => {return response.data ? response.data : response;})
      .then((data) => setVuelos(data))
      .catch((error) => console.error("Error al obtener los vuelos:", error));
  }, []);

  return (
    <>
      <h1 id="seller-vuelos-title">Vuelos exclusivos</h1>
      <div className="vuelos-container"> 
        {vuelos.map((vuelo) => (
          <div key={vuelo.id_vuelo} className="vuelo-card" onClick={() => {navigate(`/sales`);}} >
            <h3>{vuelo.destino}</h3>
            <p><b>Fecha:</b> {new Date(vuelo.fecha).toLocaleDateString()}</p>
            <p><b>Origen:</b> {vuelo.origen}</p>
            <p>Plazas Totales: {vuelo.plazasTotales}</p>
          </div>
        ))}
      </div>
    </>    
  );
};

export default Vuelos;
