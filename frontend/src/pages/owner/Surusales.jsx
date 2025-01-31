import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [newSucursal, setNewSucursal] = useState({ direccion: "", email: "", telefono: "" });
  const [editingSucursal, setEditingSucursal] = useState(null);

  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await api.get("/sucursales");
      setSucursales(response.data);
    } catch (error) {
      console.error("Error fetching sucursales:", error);
    }
  };

  const handleAddSucursal = async () => {
    try {
      const response = await api.post("/sucursales/new", newSucursal);
      setSucursales([...sucursales, response.data]);
      setNewSucursal({ direccion: "", email: "", telefono: "" });
    } catch (error) {
      console.error("Error adding sucursal:", error);
    }
  };

  const handleUpdateSucursal = async (id) => {
    try {
      const response = await api.put(`/sucursales/${id}`, editingSucursal);
      setSucursales(
        sucursales.map((sucursal) =>
          sucursal.id_sucursal === id ? response.data : sucursal
        )
      );
      setEditingSucursal(null);
    } catch (error) {
      console.error("Error updating sucursal:", error);
    }
  };

  const handleDeleteSucursal = async (id) => {
    if(confirm("¿Seguro desea eliminar esta sucursal?")) {
      try {
        await api.delete(`/sucursales/${id}`);
        setSucursales(sucursales.filter((sucursal) => sucursal.id_sucursal !== id));
      } catch (error) {
        console.error("Error deleting sucursal:", error);
      }
    }
  };

  return (
    <div className="sucursales-container">
      <h1>Lista de Sucursales</h1>
      <table className="sucursales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((sucursal) => (
            <tr key={sucursal.id_sucursal}>
              {editingSucursal?.id_sucursal === sucursal.id_sucursal ? (
                <>
                  <td>{sucursal.id_sucursal}</td>
                  <td>
                    <input
                      type="text"
                      value={editingSucursal.direccion}
                      onChange={(e) =>
                        setEditingSucursal({ ...editingSucursal, direccion: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editingSucursal.email}
                      onChange={(e) =>
                        setEditingSucursal({ ...editingSucursal, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingSucursal.telefono}
                      onChange={(e) =>
                        setEditingSucursal({ ...editingSucursal, telefono: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdateSucursal(sucursal.id_sucursal)}>
                      Guardar
                    </button>
                    <button onClick={() => setEditingSucursal(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{sucursal.id_sucursal}</td>
                  <td>{sucursal.direccion}</td>
                  <td>{sucursal.email}</td>
                  <td>{sucursal.telefono}</td>
                  <td>
                    <button onClick={() => setEditingSucursal(sucursal)}>Editar</button>
                    <button onClick={() => handleDeleteSucursal(sucursal.id_sucursal)}>
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="add-sucursal">
        <h2>Agregar Sucursal</h2>
        <input
          type="text"
          placeholder="Dirección"
          value={newSucursal.direccion}
          onChange={(e) => setNewSucursal({ ...newSucursal, direccion: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newSucursal.email}
          onChange={(e) => setNewSucursal({ ...newSucursal, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={newSucursal.telefono}
          onChange={(e) => setNewSucursal({ ...newSucursal, telefono: e.target.value })}
        />
        <button onClick={handleAddSucursal}>Agregar</button>
      </div>
    </div>
  );
};

export default Sucursales;
