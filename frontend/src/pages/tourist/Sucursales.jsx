import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import api from "../../utils/api";
import "./styles/Sucursales.css"; 

function Sucursales() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/sucursales");
        setBranches(response.data);
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <>
      <header className="sucursal-header">
        <h1>¿Dónde podés encontrarnos?</h1>
      </header>
      <div className="cards-container">
        {branches.map((branch) => (
          <div className="card" key={branch.id_sucursal}>
            <div className="map-icon-container">
              <FaMapMarkerAlt className="map-icon" />
            </div>
            <h3>{`Sucursal ${branch.id_sucursal}`}</h3>
            <p>Dirección: {branch.direccion}</p>
            <p>Teléfono: {branch.telefono}</p>
            <p>Email: {branch.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sucursales;
