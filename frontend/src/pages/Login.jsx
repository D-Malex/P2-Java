import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{document.body.classList.add("login-page");},[]); //DESABILITAMOS EL SCROLL
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, usuario, message } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("email", email);
      console.info(message);

      document.body.classList.remove("login-page");
      document.body.style.overflow = "auto";
      window.location.href = '/home';

    } catch (err) {
      console.error("Fallo en la autenticacion. " + err);
      setError("Fallo en la autenticacion. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box"> 
        <img src="../../public/columbia-viajesv2.png" alt="columbia-viajes.png not found..." className="logo"/>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <input type="email" placeholder="Correo Electrónico" value={email} 
            onChange={(e) => setEmail(e.target.value)} required
          />
          <input type="password" placeholder="Contraseña" value={password} 
            onChange={(e) => setPassword(e.target.value)} required
          />
        <button type="submit">Entrar</button>
      </form>
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Login;
