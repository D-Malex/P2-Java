import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "../Footer";
import "./styles/Personal.css";
import api from "../../utils/api";

const Personal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("3");
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [newUsuario, setNewUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    psw: "",
    direccion: "",
    telefono: "",
    id_sucursal: null,
    rol: { id_rol: parseFloat(rolSeleccionado, 10) },
  });

  useEffect(() => {
    fetchUsuarios();
    fetchSucursales();
  }, [rolSeleccionado]);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get(`/usuarios/rol/${rolSeleccionado}`);
      const usuarioLS = JSON.parse(localStorage.getItem("usuario"));
      const usuarios = response.data.filter((usuario) => usuario.id_usuario !== usuarioLS.id_usuario);
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
        rol: { id_rol: parseFloat(rolSeleccionado, 10) },
      });
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };

  const handleUpdateUsuario = async (id) => {
    try {
      const response = await api.put(`/usuarios/update`, editingUsuario);
      setUsuarios(
        usuarios.map((usuario) => usuario.id_usuario === id ? response.data : usuario)
      );
      setEditingUsuario(null);
    } catch (error) {
      console.error("Error updating usuario:", error);
    }
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
    } catch (error) {
      console.error("Error deleting usuario:", error);
    }
  };

  const filteredUsuarios = Array.isArray(usuarios) ? usuarios.filter(
    (usuario) => usuario.email.toLowerCase().includes(searchEmail.toLowerCase())) : [];



    return (
      <div id="usuarios-container">
        <NavBar />
        <h1>Lista de Usuarios</h1>

        <div className="filter-container">
          <input
            type="text"
            placeholder="Buscar por email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <select value={rolSeleccionado} onChange={(e) => setRolSeleccionado(e.target.value)}>
            <option value="3">Vendedores</option>
            <option value="2">Administradores</option>
            <option value="1">Socios</option>
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
              {rolSeleccionado === "3" && <th>Sucursal</th>}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                {editingUsuario?.id_usuario === usuario.id_usuario ? (
                  <>
                    <td>{usuario.id_usuario}</td>
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
                    {rolSeleccionado === "3" && (
                      <td>
                        <select value={editingUsuario.id_sucursal || ""}
                          onChange={(e) => setEditingUsuario({ ...editingUsuario, id_sucursal: parseFloat(e.target.value, 10),})}
                        >
                          {sucursales.map((sucursal) => (
                            <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
                              {sucursal.id_sucursal} {sucursal.direccion}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                    <td>
                      <button onClick={() => handleUpdateUsuario(usuario.id_usuario)}>
                        Guardar
                      </button>
                      <button onClick={() => setEditingUsuario(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    {rolSeleccionado === "3" && (
                      <td>
                        {
                          sucursales.find(
                            (sucursal) => sucursal.id_sucursal === usuario.id_sucursal
                          )?.direccion || "Sin sucursal"
                        }
                      </td>
                    )}
                    <td>
                      <button onClick={() => setEditingUsuario(usuario)}>Editar</button>
                      <button onClick={() => handleDeleteUsuario(usuario.id_usuario)}>
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
          {rolSeleccionado === "3" && (
            <select value={newUsuario.id_sucursal || ""}
              onChange={(e) => setNewUsuario({ ...newUsuario, id_sucursal: parseFloat(e.target.value, 10),})}
            >
              <option value="" disabled>Seleccione sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
                    {sucursal.id_sucursal} {sucursal.direccion}
                  </option>
                ))}
            </select>
          )}

          <button onClick={handleCreateUsuario}>Agregar</button>
        </div>
        <Footer />
      </div>
    );
};

export default Personal;