import React, { useState } from "react";
import api from "../utils/api";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, usuario, message } = response.data;

      // Guardar token en localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("email", email);
      console.info(message);

      window.location.href = '/home';
      
    } catch (err) {
      console.error("Fallo en la autenticacion. " + err);
      setError("Fallo en la autenticacion. Por favor, intenta de nuevo.");
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
