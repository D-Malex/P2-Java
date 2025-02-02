import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./styles/RegistroVentas.css";

const RegistroVentas = () => {
  const [vendedores, setVendedores] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendedoresResponse = await api.get("/usuarios/rol/679e8b7a6ce41db2b0d3b904");
        const ventasResponse = await api.get("/ventas");
        setVendedores(vendedoresResponse.data);
        setVentas(ventasResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calcular recuento de ventas por vendedor
  const getVentasPorVendedor = (idVendedor) => {
    return ventas.filter((venta) => venta.vendedor._id === idVendedor).length;
  };

  // Calcular total recaudado por vendedor en el mes actual
  const getTotalRecaudadoPorVendedor = (idVendedor) => {
    const currentMonth = new Date().getMonth();
    return ventas
      .filter((venta) => venta.vendedor._id === idVendedor && new Date(venta.fechaVenta).getMonth() === currentMonth)
      .reduce((total, venta) => total + venta.viaje.precio, 0);
  };

  // Filtrar vendedores por email
  const filteredVendedores = vendedores.filter((vendedor) =>
    vendedor.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="registro-ventas">
      <h1>Registro de Ventas</h1>
      <input
        type="text"
        placeholder="Buscar por email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
      />
      <table className="tabla-vendedores">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Recuento de Ventas</th>
            <th>Total Recaudado</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendedores.map((vendedor) => (
            <tr key={vendedor._id}>
              <td>{vendedor._id}</td>
              <td>{vendedor.nombre}</td>
              <td>{vendedor.apellido}</td>
              <td>{vendedor.email}</td>
              <td>{vendedor.direccion}</td>
              <td>{vendedor.telefono}</td>
              <td>{getVentasPorVendedor(vendedor._id)}</td>
              <td>$ {getTotalRecaudadoPorVendedor(vendedor._id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroVentas;