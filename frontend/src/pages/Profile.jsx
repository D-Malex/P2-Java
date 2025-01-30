import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "./styles/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("No se encontró un usuario con su email en la base de datos.");
        }
        const response = await api.get(`usuarios/email/`, { params: { email } });
        setUserData(response.data);
        setFormData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true); 
  };

  const handleSave = async () => {
    try {
      const response = await api.put("usuarios/update", formData);
      setUserData(response.data);
      setIsDirty(false);
      alert("Datos actualizados correctamente.");
    } catch (err) {
      alert("Error ingrese un email que no esté en uso.");
    }
  };

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
    <>
      <h1 id="profile-title">Mi Perfil</h1>
      <div className="profile-card">
        <form>
          <label>
            <strong>Nombre:</strong>
            <input type="text" name="nombre" value={formData.nombre || ""} onChange={handleInputChange} />
          </label>
          <label>
            <strong>Apellido:</strong>
            <input type="text" name="apellido" value={formData.apellido || ""} onChange={handleInputChange} />
          </label>
          <label>
            <strong>Email:</strong>
            <input type="email" name="email" value={formData.email || ""} onChange={handleInputChange} />
          </label>
          <label>
            <strong>Contraseña:</strong>
            <input type="password" name="psw" value={formData.psw || ""} onChange={handleInputChange} />
          </label>
          <label>
            <strong>Teléfono:</strong>
            <input type="text" name="telefono" value={formData.telefono || ""} onChange={handleInputChange} />
          </label>
          <label>
            <strong>Dirección:</strong>
            <input type="text" name="direccion" value={formData.direccion || ""} onChange={handleInputChange}/>
          </label>
          <div className="buttons">
            <button type="button" onClick={handleSave} disabled={!isDirty} className={isDirty ? "active" : "disabled"}>
              Guardar
            </button>
            <button type="button" onClick={handleCancel} disabled={!isDirty} className={isDirty ? "active" : "disabled"}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
