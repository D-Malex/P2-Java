import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import NavBar from "./NavBar";
import Footer from "../Footer";
import "./styles/RegistroVenta.css";

const RegistroVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [totalFacturado, setTotalFacturado] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario = usuario.id_usuario;

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await api.get(`/ventas/usuario/${id_usuario}`);
        const ventasData = response.data;

        // Calcular el total facturado este mes
        const total = ventasData.reduce((acc, venta) => {
          const fechaVenta = new Date(venta.fechaVenta);
          const mesActual = new Date().getMonth();
          const anioActual = new Date().getFullYear();

          if (
            fechaVenta.getMonth() === mesActual &&
            fechaVenta.getFullYear() === anioActual
          ) {
            return acc + venta.viaje.precio;
          }
          return acc;
        }, 0);

        setVentas(ventasData);
        setTotalFacturado(total);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  return (
    <>
      <NavBar/>
      <div className="registro-ventas-container">
      {/* Tabla de ventas */}
      <div className="tabla-ventas">
        <h2 className="titulo">Registro de Ventas</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Viaje</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta, index) => (
                <tr key={venta.id_venta}>
                  <td>{index + 1}</td>
                  <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
                  <td>{venta.viaje.id_viaje}</td>
                  <td>${venta.viaje.precio.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="sin-ventas">
                  No se encontraron ventas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total facturado */}
      <div className="total-facturado">
        <h3>Total Facturado Este Mes</h3>
        <p>${totalFacturado.toFixed(2)}</p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default RegistroVentas;
