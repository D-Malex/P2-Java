import React, { useState, useEffect } from "react";
import api from "../../utils/api";


const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [newHotel, setNewHotel] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    plazasDisponibles: null
  });

  useEffect(() => {
    fetchHoteles();
  }, []);

  const fetchHoteles = async () => {
    try {
      const response = await api.get("/hoteles");
      setHoteles(response.data);
    } catch (error) {
      console.error("Error fetching hoteles:", error);
    }
  };

  const handleAddHotel = async () => {
    try {
      const response = await api.post("/hoteles/new", newHotel);
      setHoteles([...hoteles, response.data]);
      setNewHotel({
        nombre: "",
        direccion: "",
        ciudad: "",
        telefono: "",
        plazasDisponibles: 0,
      });
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const handleUpdateHotel = async (id) => {
    try {
      const response = await api.put(`/hoteles/${id}`, editingHotel);
      setHoteles(
        hoteles.map((hotel) =>
          hotel._id === id ? response.data : hotel
        )
      );
      setEditingHotel(null);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleDeleteHotel = async (id) => {
    if(confirm("¿Seguro desea eliminar este hotel?")) {
      try {
        await api.delete(`/hoteles/${id}`);
        setHoteles(hoteles.filter((hotel) => hotel._id !== id));
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
    }
  };

  return (
    <div id="hoteles-container">
      <h1>Lista de Hoteles</h1>
      <table className="hoteles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Plazas Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hoteles.map((hotel) => (
            <tr key={hotel._id}>
              {editingHotel?._id === hotel._id ? (
                <>
                  <td>{hotel._id}</td>
                  <td>
                    <input
                      type="text"
                      value={editingHotel.nombre}
                      onChange={(e) =>
                        setEditingHotel({ ...editingHotel, nombre: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingHotel.direccion}
                      onChange={(e) =>
                        setEditingHotel({ ...editingHotel, direccion: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingHotel.ciudad}
                      onChange={(e) =>
                        setEditingHotel({ ...editingHotel, ciudad: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingHotel.telefono}
                      onChange={(e) =>
                        setEditingHotel({ ...editingHotel, telefono: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={editingHotel.plazasDisponibles}
                      onChange={(e) =>
                        setEditingHotel({
                          ...editingHotel,
                          plazasDisponibles: parseInt(e.target.value, 10),
                        })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdateHotel(hotel._id)}>Guardar</button>
                    <button onClick={() => setEditingHotel(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{hotel._id}</td>
                  <td>{hotel.nombre}</td>
                  <td>{hotel.direccion}</td>
                  <td>{hotel.ciudad}</td>
                  <td>{hotel.telefono}</td>
                  <td>{hotel.plazasDisponibles}</td>
                  <td>
                    <button onClick={() => setEditingHotel(hotel)}>Editar</button>
                    <button onClick={() => handleDeleteHotel(hotel._id)}>
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-hotel">
        <h2>Agregar Hotel</h2>
        <input type="text" placeholder="Nombre" value={newHotel.nombre} onChange={(e) => setNewHotel({ ...newHotel, nombre: e.target.value })} />
        <input type="text" placeholder="Dirección" value={newHotel.direccion} onChange={(e) => setNewHotel({ ...newHotel, direccion: e.target.value })} />
        <input type="text" placeholder="Ciudad" value={newHotel.ciudad} onChange={(e) => setNewHotel({ ...newHotel, ciudad: e.target.value })} />
        <input type="text" placeholder="Teléfono" value={newHotel.telefono} onChange={(e) => setNewHotel({ ...newHotel, telefono: e.target.value })} />
        <input type="number" min="0" placeholder="Plazas Disponibles" value={newHotel.plazasDisponibles} onChange={(e) => setNewHotel({ ...newHotel, plazasDisponibles: parseInt(e.target.value, 10) })} />
        <button onClick={handleAddHotel}>Agregar</button>
      </div>
    </div>
  );
};

export default Hoteles;
