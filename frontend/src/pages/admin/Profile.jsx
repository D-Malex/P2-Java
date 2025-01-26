import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Footer from "../Footer";
import NavBar from "./NavBar";
import "./styles/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false); // Para habilitar botones

  // traer informacion del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("No se encontró un usuario con su email en la base de datos.");
        }
        const response = await api.get(`usuarios/email/`, { params: { email } });
        setUserData(response.data);
        setFormData(response.data); // Inicializar formulario con los datos del usuario
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Detectar cambios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true); 
  };

  // Guardar los cambios
  const handleSave = async () => {
    try {
      const response = await api.put("usuarios/update", formData);
      setUserData(response.data); // Actualiza la información local con los datos del backend
      setIsDirty(false);
      alert("Datos actualizados correctamente.");
    } catch (err) {
      alert("Error ingrese un email que no esté en uso.");
    }
  };

  // Restaurar datos originales
  const handleCancel = () => {
    setFormData(userData); 
    setIsDirty(false);
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
      <NavBar />
      <h1>Perfil de Usuario</h1>
      <div className="profile-card">
        <form>
          <label>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Apellido:</strong>
            <input
              type="text"
              name="apellido"
              value={formData.apellido || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Teléfono:</strong>
            <input
              type="text"
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Dirección:</strong>
            <input
              type="text"
              name="direccion"
              value={formData.direccion || ""}
              onChange={handleInputChange}
            />
          </label>
          <div className="buttons">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty}
              className={isDirty ? "active" : "disabled"}
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isDirty}
              className={isDirty ? "active" : "disabled"}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
