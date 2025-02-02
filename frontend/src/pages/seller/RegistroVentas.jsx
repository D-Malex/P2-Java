import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./styles/RegistroVenta.css";

const RegistroVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [totalFacturado, setTotalFacturado] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario = usuario._id;

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await api.get(`/ventas/usuario/${id_usuario}`);
        const ventasData = response.data;

        const mesActual = new Date().getMonth();
        const anioActual = new Date().getFullYear();

        const ventasEsteMes = ventasData.filter(venta => {
          const fechaVenta = new Date(venta.fechaVenta);
          return fechaVenta.getMonth() === mesActual && fechaVenta.getFullYear() === anioActual;
        });

        const total = ventasEsteMes.reduce((acc, venta) => acc + venta.viaje.precio, 0);

        setVentas(ventasEsteMes);
        setTotalFacturado(total);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  return (
    <>
      <div className="registro-ventas-container">
      <div className="tabla-ventas">
        <h1 id="seller-regventas-title">Registro de Ventas</h1>
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha de venta</th>
              <th>Destino</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta, index) => (
                <tr key={venta._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
                  <td>{venta.viaje.vuelo.destino}</td>
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

      <div className="total-facturado">
        <h3>Total Facturado Este Mes</h3>
        <p>${totalFacturado.toFixed(2)}</p>
      </div>
    </div>
    </>
  );
};

export default RegistroVentas;
