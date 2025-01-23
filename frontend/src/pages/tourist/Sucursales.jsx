import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"; // Importamos la barra de navegación
import api from "../../utils/api"; // Configuración de Axios o similar
import "./styles/Sucursales.css"; // Importamos los estilos

function Sucursales() {
  const [branches, setBranches] = useState([]); // Estado para almacenar las sucursales

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/sucursales"); // Llamada al endpoint de sucursales
        setBranches(response.data); // Guardamos todas las sucursales
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
      }
    };

    fetchBranches();
  }, []); // Ejecutar el efecto una sola vez al montar el componente

  return (
    <div className="sucursal-container">
      <NavBar /> {/* Mostramos la barra de navegación */}
      <header className="sucursal-header">
        <h1>¿Dónde podés encontrarnos?</h1>
      </header>
      <section className="branches">
        <div className="cards-container">
          {branches.map((branch) => (
            <div className="card" key={branch.id_Sucursal}>
              <img
                src={`sucursal${branch.id_Sucursal}.jpg`} // Suposición de imágenes nombradas por ID
                alt={`Sucursal ${branch.id_Sucursal}`}
              />
              <h3>{`Sucursal ${branch.id_Sucursal}`}</h3>
              <p>Dirección: {branch.direccion}</p>
              <p>Teléfono: {branch.telefono}</p>
              <p>Email: {branch.email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Sucursales;
