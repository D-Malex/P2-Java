import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Vuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const [editingVuelo, setEditingVuelo] = useState(null);
  const [newVuelo, setNewVuelo] = useState({
    fecha: "",
    hora: "",
    origen: "",
    destino: "",
    plazasTotales: null,
    plazasTurista: null,
  });

  useEffect(() => {
    fetchVuelos();
  }, []);

  const fetchVuelos = async () => {
    try {
      const response = await api.get("/vuelos");
      setVuelos(response.data);
    } catch (error) {
      console.error("Error fetching vuelos:", error);
    }
  };

  const handleAddVuelo = async () => {
    try {
      const response = await api.post("/vuelos/new", newVuelo);
      setVuelos([...vuelos, response.data]);
      setNewVuelo({
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        plazasTotales: null,
        plazasTurista: null,
      });
    } catch (error) {
      console.error("Error adding vuelo:", error);
    }
  };

  const handleUpdateVuelo = async (id) => {
    try {
      const response = await api.put(`/vuelos/${id}`, editingVuelo);
      setVuelos(
        vuelos.map((vuelo) =>
          vuelo.id_vuelo === id ? response.data : vuelo
        )
      );
      setEditingVuelo(null);
    } catch (error) {
      console.error("Error updating vuelo:", error);
    }
  };

  const handleDeleteVuelo = async (id) => {
    try {
      await api.delete(`/vuelos/${id}`);
      setVuelos(vuelos.filter((vuelo) => vuelo.id_vuelo !== id));
    } catch (error) {
      console.error("Error deleting vuelo:", error);
    }
  };

  return (
    <div id="vuelos-container">
      <h1>Lista de Vuelos</h1>
      <table className="vuelos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Plazas Totales</th>
            <th>Plazas Turista</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vuelos.map((vuelo) => (
            <tr key={vuelo.id_vuelo}>
              {editingVuelo?.id_vuelo === vuelo.id_vuelo ? (
                <>
                  <td>{vuelo.id_vuelo}</td>
                  <td>
                    <input
                      type="date"
                      value={editingVuelo.fecha}
                      onChange={(e) =>
                        setEditingVuelo({ ...editingVuelo, fecha: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={editingVuelo.hora}
                      onChange={(e) =>
                        setEditingVuelo({ ...editingVuelo, hora: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingVuelo.origen}
                      onChange={(e) =>
                        setEditingVuelo({ ...editingVuelo, origen: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingVuelo.destino}
                      onChange={(e) =>
                        setEditingVuelo({ ...editingVuelo, destino: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={editingVuelo.plazasTotales}
                      onChange={(e) =>
                        setEditingVuelo({
                          ...editingVuelo,
                          plazasTotales: parseInt(e.target.value, 10),
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={editingVuelo.plazasTurista}
                      onChange={(e) =>
                        setEditingVuelo({
                          ...editingVuelo,
                          plazasTurista: parseInt(e.target.value, 10),
                        })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdateVuelo(vuelo.id_vuelo)}>Guardar</button>
                    <button onClick={() => setEditingVuelo(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{vuelo.id_vuelo}</td>
                  <td>{vuelo.fecha}</td>
                  <td>{vuelo.hora}</td>
                  <td>{vuelo.origen}</td>
                  <td>{vuelo.destino}</td>
                  <td>{vuelo.plazasTotales}</td>
                  <td>{vuelo.plazasTurista}</td>
                  <td>
                    <button onClick={() => setEditingVuelo(vuelo)}>Editar</button>
                    <button onClick={() => handleDeleteVuelo(vuelo.id_vuelo)}>
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-vuelo">
        <h2>Agregar Vuelo</h2>
        <input
          type="date"
          placeholder="Fecha"
          value={newVuelo.fecha}
          onChange={(e) => setNewVuelo({ ...newVuelo, fecha: e.target.value })}
        />
        <input
          type="time"
          placeholder="Hora"
          value={newVuelo.hora}
          onChange={(e) => setNewVuelo({ ...newVuelo, hora: e.target.value })}
        />
        <input
          type="text"
          placeholder="Origen"
          value={newVuelo.origen}
          onChange={(e) => setNewVuelo({ ...newVuelo, origen: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destino"
          value={newVuelo.destino}
          onChange={(e) => setNewVuelo({ ...newVuelo, destino: e.target.value })}
        />
        <input
          type="number"
          min="0"
          placeholder="Plazas Totales"
          value={newVuelo.plazasTotales}
          onChange={(e) => setNewVuelo({ ...newVuelo, plazasTotales: parseInt(e.target.value, 10) })}
        />
        <input
          type="number"
          min="0"
          placeholder="Plazas Turista"
          value={newVuelo.plazasTurista}
          onChange={(e) => setNewVuelo({ ...newVuelo, plazasTurista: parseInt(e.target.value, 10) })}
        />
        <button onClick={handleAddVuelo}>Agregar</button>
      </div>
    </div>
  );
};

export default Vuelos;