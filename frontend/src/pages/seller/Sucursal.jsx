import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Footer from "../Footer";
import NavBar from "./NavBar";

const Sucursal = () => {
  const [sucursalData, setSucursalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSucursalData = async () => {
      try {

        const userData = JSON.parse(localStorage.getItem("usuario"));
        if (!userData || !userData.id_sucursal) {
          throw new Error("No se encontró información de sucursal en el usuario.");
        }

        const response = await api.get(`/sucursales/${userData.id_sucursal}`);
        setSucursalData(response.data); 
      } catch (err) {
        setError(err.message || "Error al obtener la información de la sucursal.");
      } finally {
        setLoading(false); 
      }
    };

    fetchSucursalData();
  }, []);


  if (loading) {
    return <p>Cargando datos de la sucursal...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
      <NavBar />
      <h1>Información de la Sucursal</h1>
      <div className="profile-card">
        <h2>Sucursal #{sucursalData.id_sucursal}</h2>
        <p>
          <strong>Dirección:</strong> {sucursalData.direccion}
        </p>
        <p>
          <strong>Email:</strong> {sucursalData.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {sucursalData.telefono}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Sucursal;
