import React, { useState, useEffect } from "react";
import "./styles/Personal.css";
import api from "../../utils/api";

const Personal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("679e8b7a6ce41db2b0d3b904");
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [newUsuario, setNewUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    psw: "",
    direccion: "",
    telefono: "",
    id_sucursal: null,
    rol: { id_rol: rolSeleccionado },
  });

  useEffect(() => {
    setNewUsuario((prev) => ({ ...prev, rol: { id_rol: rolSeleccionado }, }));
    fetchUsuarios();
    fetchSucursales();
  }, [rolSeleccionado]);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get(`/usuarios/rol/${rolSeleccionado}`);
      const usuarioLS = JSON.parse(localStorage.getItem("usuario"));
      const usuarios = response.data.filter((usuario) => usuario._id !== usuarioLS._id);
      setUsuarios(usuarios);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
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

  const handleCreateUsuario = async () => {
    try {
      const response = await api.post("/usuarios/new", newUsuario);
      setUsuarios([...usuarios, response.data]);
      setNewUsuario({
        nombre: "",
        apellido: "",
        email: "",
        psw: "",
        direccion: "",
        telefono: "",
        id_sucursal: null,
        rol: { id_rol: rolSeleccionado },
      });
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };

  const handleUpdateUsuario = async (id) => {
    try {
      const response = await api.put(`/usuarios/update`, editingUsuario);
      setUsuarios(
        usuarios.map((usuario) => usuario._id === id ? response.data : usuario)
      );
      setEditingUsuario(null);
    } catch (error) {
      console.error("Error updating usuario:", error);
    }
  };

  const handleDeleteUsuario = async (id) => {
    if(confirm("¿Seguro desea eliminar a este usuario?")) {
      try {
        await api.delete(`/usuarios/${id}`);
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
      } catch (error) {
        console.error("Error deleting usuario:", error);
      }
    }
  };

  const filteredUsuarios = Array.isArray(usuarios) ? usuarios.filter(
    (usuario) => usuario.email.toLowerCase().includes(searchEmail.toLowerCase())) : [];



    return (
      <div id="usuarios-container">
        <h1>Lista de Usuarios</h1>

        <div className="filter-container">
          <input
            type="text"
            placeholder="Buscar por email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <select value={rolSeleccionado} onChange={(e) => setRolSeleccionado(e.target.value)}>
            <option value="679e8b7a6ce41db2b0d3b904">Vendedores</option>
            <option value="679e8b7a6ce41db2b0d3b903">Administradores</option>
            <option value="679e8b7a6ce41db2b0d3b902">Socios</option>
          </select>
        </div>

        
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              {rolSeleccionado === "679e8b7a6ce41db2b0d3b904" && <th>Sucursal</th>}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario._id}>
                {editingUsuario?._id === usuario._id ? (
                  <>
                    <td>{usuario._id}</td>
                    <td>
                      <input type="text" value={editingUsuario.nombre || ""}
                        onChange={(e) => setEditingUsuario({ ...editingUsuario, nombre: e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="text" value={editingUsuario.apellido || ""}
                        onChange={(e) => setEditingUsuario({ ...editingUsuario, apellido: e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="email" value={editingUsuario.email || ""}
                        onChange={(e) => setEditingUsuario({ ...editingUsuario, email: e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="text" value={editingUsuario.telefono || ""}
                        onChange={(e) => setEditingUsuario({ ...editingUsuario, telefono: e.target.value })}
                      />
                    </td>
                    {rolSeleccionado === "679e8b7a6ce41db2b0d3b904" && (
                      <td>
                        <select value={editingUsuario.id_sucursal || ""}
                          onChange={(e) => setEditingUsuario({ ...editingUsuario, id_sucursal: e.target.value,})}
                        >
                          {sucursales.map((sucursal) => (
                            <option key={sucursal._id} value={sucursal._id}>
                              {sucursal._id} {sucursal.direccion}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                    <td>
                      <button onClick={() => handleUpdateUsuario(usuario._id)}>
                        Guardar
                      </button>
                      <button onClick={() => setEditingUsuario(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{usuario._id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    {rolSeleccionado === "679e8b7a6ce41db2b0d3b904" && (
                      <td>
                        {
                          sucursales.find(
                            (sucursal) => sucursal._id === usuario.id_sucursal
                          )?.direccion || null
                        }
                      </td>
                    )}
                    <td>
                      <button onClick={() => setEditingUsuario(usuario)}>Editar</button>
                      <button onClick={() => handleDeleteUsuario(usuario._id)}>
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
          ))}
        </tbody>

        </table>

        <div className="add-usuario">
          <h2>Agregar Usuario</h2>
          <input type="text" placeholder="Nombre" value={newUsuario.nombre}
            onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
          />
          <input type="text" placeholder="Apellido" value={newUsuario.apellido}
            onChange={(e) => setNewUsuario({ ...newUsuario, apellido: e.target.value })}
          />
          <input type="email" placeholder="Email" value={newUsuario.email}
            onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
          />
          <input type="password" placeholder="Contraseña" value={newUsuario.psw}
            onChange={(e) => setNewUsuario({ ...newUsuario, psw: e.target.value })}
          />
          <input type="text" placeholder="Dirección" value={newUsuario.direccion}
            onChange={(e) => setNewUsuario({ ...newUsuario, direccion: e.target.value })}
          />
          <input type="text" placeholder="Teléfono" value={newUsuario.telefono}
            onChange={(e) => setNewUsuario({ ...newUsuario, telefono: e.target.value })}
          />
          {rolSeleccionado === "679e8b7a6ce41db2b0d3b904" && (
            <select value={newUsuario.id_sucursal || ""}
              onChange={(e) => setNewUsuario({ ...newUsuario, id_sucursal: e.target.value,})}
            >
              <option value="" disabled>Seleccione sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal._id} value={sucursal._id}>
                    {sucursal._id} {sucursal.direccion}
                  </option>
                ))}
            </select>
          )}

          <button onClick={handleCreateUsuario}>Agregar</button>
        </div>
      </div>
    );
};

export default Personal;