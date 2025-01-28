import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import NavBar from "./NavBar";
import Footer from "../Footer";
import "./styles/RegistroVentas.css"; // Archivo CSS para los estilos

const RegistroVentas = () => {
  const [vendedores, setVendedores] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendedoresResponse = await api.get("/usuarios/rol/3");
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
    return ventas.filter((venta) => venta.vendedor.id_usuario === idVendedor).length;
  };

  // Calcular total recaudado por vendedor en el mes actual
  const getTotalRecaudadoPorVendedor = (idVendedor) => {
    const currentMonth = new Date().getMonth();
    return ventas
      .filter((venta) => venta.vendedor.id_usuario === idVendedor && new Date(venta.fechaVenta).getMonth() === currentMonth)
      .reduce((total, venta) => total + venta.viaje.precio, 0);
  };

  // Filtrar vendedores por email
  const filteredVendedores = vendedores.filter((vendedor) =>
    vendedor.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="registro-ventas">
      <NavBar />
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
            <tr key={vendedor.id_usuario}>
              <td>{vendedor.id_usuario}</td>
              <td>{vendedor.nombre}</td>
              <td>{vendedor.apellido}</td>
              <td>{vendedor.email}</td>
              <td>{vendedor.direccion}</td>
              <td>{vendedor.telefono}</td>
              <td>{getVentasPorVendedor(vendedor.id_usuario)}</td>
              <td>$ {getTotalRecaudadoPorVendedor(vendedor.id_usuario)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default RegistroVentas;