import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "../Footer";
import "./styles/Vendedores.css";
import api from "../../utils/api";

const Vendedores = () => {
  const [vendedores, setVendedores] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [editingVendedor, setEditingVendedor] = useState(null);
  const [newVendedor, setNewVendedor] = useState({
    nombre: "",
    apellido: "",
    email: "",
    psw: "",
    direccion: "",
    telefono: "",
    id_sucursal: 0,
    rol: { id_rol: 3 },
  });

  useEffect(() => {
    fetchVendedores();
    fetchSucursales();
  }, []);

  const fetchVendedores = async () => {
    try {
      const response = await api.get("/usuarios/rol/3");
      setVendedores(response.data);
    } catch (error) {
      console.error("Error fetching vendedores:", error);
    }
  };

  const fetchSucursales = async () => {
    try {
      const response = await api.get("/sucursales");
      setSucursales(response.data);
    } catch (error) {
      console.error("Error fetching sucursales:", error);
    }
  };

  const handleCreateVendedor = async () => {
    try {
      const response = await api.post("/usuarios/new", newVendedor);
      setVendedores([...vendedores, response.data]);
      setNewVendedor({
        nombre: "",
        apellido: "",
        email: "",
        psw: "",
        direccion: "",
        telefono: "",
        id_sucursal: 0,
        rol: { id_rol: 3 },
      });
    } catch (error) {
      console.error("Error creating vendedor:", error);
    }
  };

  const handleUpdateVendedor = async (id) => {
    try {
      const response = await api.put(`/usuarios/update`, editingVendedor);
      setVendedores(
        vendedores.map((vendedor) =>
          vendedor.id_usuario === id ? response.data : vendedor
        )
      );
      setEditingVendedor(null);
    } catch (error) {
      console.error("Error updating vendedor:", error);
    }
  };

  const handleDeleteVendedor = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      setVendedores(vendedores.filter((vendedor) => vendedor.id_usuario !== id));
    } catch (error) {
      console.error("Error deleting vendedor:", error);
    }
  };


  const filteredVendedores = Array.isArray(vendedores) ? 
    vendedores.filter((vendedor) => vendedor.email.toLowerCase().includes(searchEmail.toLowerCase())) : 
    [];

    return (
      <div id="vendedores-container">
        <NavBar />
        <h1>Lista de Vendedores</h1>
        <input
          type="text"
          placeholder="Buscar por email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <table className="vendedores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Sucursal</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredVendedores.map((vendedor) => (
              <tr key={vendedor.id_usuario}>
                {editingVendedor?.id_usuario === vendedor.id_usuario ? (
                  <>
                    <td>{vendedor.id_usuario}</td>
                    <td>{vendedor.nombre}</td>
                    <td>{vendedor.apellido}</td>
                    <td>{vendedor.email}</td>
                    <td>{vendedor.telefono}</td>
                    <td>
                      <select
                        value={editingVendedor.id_sucursal}
                        onChange={(e) =>
                          setEditingVendedor({
                            ...editingVendedor,
                            id_sucursal: parseInt(e.target.value, 10),
                          })
                        }
                      >
                        {sucursales.map((sucursal) => (
                          <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
                            {sucursal.id_sucursal} {sucursal.direccion}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleUpdateVendedor(vendedor.id_usuario)}>Guardar</button>
                      <button onClick={() => setEditingVendedor(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{vendedor.id_usuario}</td>
                    <td>{vendedor.nombre}</td>
                    <td>{vendedor.apellido}</td>
                    <td>{vendedor.email}</td>
                    <td>{vendedor.telefono}</td>
                    <td>{vendedor.id_sucursal}</td>
                    <td>
                      <button onClick={() => setEditingVendedor(vendedor)}>Editar</button>
                      <button onClick={() => handleDeleteVendedor(vendedor.id_usuario)}>Eliminar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-vendedor">
      <h2>Agregar Vendedor</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newVendedor.nombre}
        onChange={(e) =>
          setNewVendedor({ ...newVendedor, nombre: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Apellido"
        value={newVendedor.apellido}
        onChange={(e) =>
          setNewVendedor({ ...newVendedor, apellido: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={newVendedor.email}
        onChange={(e) =>
          setNewVendedor({ ...newVendedor, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={newVendedor.psw}
        onChange={(e) =>
          setNewVendedor({ ...newVendedor, psw: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Dirección"
        value={newVendedor.direccion}
        onChange={(e) =>
          setNewVendedor({ ...newVendedor, direccion: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={newVendedor.telefono}
        onChange={(e) =>
          setNewVendedor({ ...newVendedor, telefono: e.target.value })
        }
      />
      <select
        value={newVendedor.id_sucursal}
        onChange={(e) =>
          setNewVendedor({
            ...newVendedor,
            id_sucursal: parseInt(e.target.value, 10),
          })
        }
      >
        <option value={0} disabled>
          Seleccione una sucursal
        </option>
        {sucursales.map((sucursal) => (
          <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
            {sucursal.id_sucursal} - {sucursal.direccion}
          </option>
        ))}
      </select>
      <button onClick={handleCreateVendedor}>Agregar</button>
    </div>
        <Footer />
      </div>
    );
};

export default Vendedores;