import React, { useEffect, useState } from "react";
import "./styles/Sucursal.css";
import api from "../../utils/api";

const Sucursal = () => {
  const [sucursalData, setSucursalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSucursal = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.id_sucursal) {
          throw new Error("No se encontró información de sucursal en el usuario.");
        }
  
        const response = await api.get(`/sucursales/${usuario.id_sucursal}`);
        setSucursalData(response.data);
      } catch (err) {
        setError(err.message || "Error al obtener la información de la sucursal.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchSucursal();
  }, []);


  if (loading) {
    return <p>Cargando datos de la sucursal...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="sucursal-container">
      <h1>Información de la Sucursal</h1>
        <div className="sucursal-card">
          <h2>Sucursal</h2>
          <p><strong>Dirección:</strong> {sucursalData.direccion}</p>
          <p><strong>Email:</strong> {sucursalData.email}</p>
          <p><strong>Teléfono:</strong> {sucursalData.telefono}</p>
        </div>
      </div>
    </>
  );
};

export default Sucursal;
