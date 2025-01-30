import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./styles/Sucursales.css"; 

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
    <>
      <header className="sucursal-header">
        <h1>¿Dónde podés encontrarnos?</h1>
      </header>
      <section className="branches">
        <div className="cards-container">
          {branches.map((branch) => (
            <div className="card" key={branch.id_sucursal}>
              <img
                src={`sucursal${branch.id_sucursal}.jpg`} // Suposición de imágenes nombradas por ID
                alt={`Sucursal ${branch.id_sucursal}`}
              />
              <h3>{`Sucursal ${branch.id_sucursal}`}</h3>
              <p>Dirección: {branch.direccion}</p>
              <p>Teléfono: {branch.telefono}</p>
              <p>Email: {branch.email}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Sucursales;
