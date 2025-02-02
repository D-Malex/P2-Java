import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import "./styles/Vendedores.css";

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
    id_sucursal: null,
    rol: { id_rol: "679e8b7a6ce41db2b0d3b904" },
  });

  useEffect(() => {
    fetchVendedores();
    fetchSucursales();
  }, []);

  const fetchVendedores = async () => {
    try {
      const response = await api.get("/usuarios/rol/679e8b7a6ce41db2b0d3b904");
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
        id_sucursal: null,
        rol: { id_rol: "679e8b7a6ce41db2b0d3b904" },
      });
    } catch (error) {
      console.error("Error creating vendedor:", error);
    }
  };

  const handleUpdateVendedor = async (id) => {
    try {
      const response = await api.put(`/usuarios/update`, editingVendedor);
      setVendedores(
        vendedores.map((vendedor) => vendedor._id === id ? response.data : vendedor)
      );
      setEditingVendedor(null);
    } catch (error) {
      console.error("Error updating vendedor:", error);
    }
  };

  const handleDeleteVendedor = async (id) => {
    if(confirm("¿Seguro que desea eliminar a este vendedor?")) {
      try {
        await api.delete(`/usuarios/${id}`);
        setVendedores(vendedores.filter((vendedor) => vendedor._id !== id));
      } catch (error) {
        console.error("Error deleting vendedor:", error);
      }
    }
  };


  const filteredVendedores = Array.isArray(vendedores) ? 
    vendedores.filter((vendedor) => vendedor.email.toLowerCase().includes(searchEmail.toLowerCase())) : 
    [];

    return (
      <div id="vendedores-container">
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
              <tr key={vendedor._id}>
                {editingVendedor?._id === vendedor._id ? (
                  <>
                    <td>{vendedor._id}</td>
                    <td>
                      <input type="text" value={editingVendedor.nombre || ""}
                        onChange={(e) => setEditingVendedor({ ...editingVendedor, nombre: e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="text" value={editingVendedor.apellido || ""}
                        onChange={(e) => setEditingVendedor({ ...editingVendedor, apellido: e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="email" value={editingVendedor.email || ""}
                        onChange={(e) => setEditingVendedor({ ...editingVendedor, email: e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="text" value={editingVendedor.telefono || ""}
                        onChange={(e) => setEditingVendedor({ ...editingVendedor, telefono: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editingVendedor.id_sucursal}
                        onChange={(e) =>
                          setEditingVendedor({
                            ...editingVendedor,
                            id_sucursal: e.target.value,
                          })
                        }
                      >
                        {sucursales.map((sucursal) => (
                          <option key={sucursal._id} value={sucursal._id}>
                            {sucursal._id} {sucursal.direccion}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleUpdateVendedor(vendedor._id)}>Guardar</button>
                      <button onClick={() => setEditingVendedor(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{vendedor._id}</td>
                    <td>{vendedor.nombre}</td>
                    <td>{vendedor.apellido}</td>
                    <td>{vendedor.email}</td>
                    <td>{vendedor.telefono}</td>
                    <td>{vendedor.id_sucursal}</td>
                    <td>
                      <button onClick={() => setEditingVendedor(vendedor)}>Editar</button>
                      <button onClick={() => handleDeleteVendedor(vendedor._id)}>Eliminar</button>
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
            id_sucursal: e.target.value,
          })
        }
      >
        <option value={0} disabled>
          Seleccione una sucursal
        </option>
        {sucursales.map((sucursal) => (
          <option key={sucursal._id} value={sucursal._id}>
            {sucursal._id} - {sucursal.direccion}
          </option>
        ))}
      </select>
      <button onClick={handleCreateVendedor}>Agregar</button>
    </div>
      </div>
    );
};

export default Vendedores;