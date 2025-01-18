import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, userType } = response.data;

      // Guardar token en localStorage
      localStorage.setItem("authToken", token);

      //? Está bien que esto lo maneje el login o deberia hacerlo el app/main
      switch (userType) {
        case "Owner":
          navigate("/home/owner");
          break;
        case "Admin":
          navigate("/home/admin");
          break;
        case "Vendor":
          navigate("/home/vendor");
          break;
        case "Tourist":
          navigate("/home/tourist");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
