import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../utils/api";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  
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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios/new", { nombre, apellido, email, psw: password, direccion, telefono, rol: { id_rol: 4 }, id_sucursal: null });
      console.info(response.data);
      alert("Usuario registrado con exito.");
      console.log("Usuario registrado con exito.");
      setIsRegistering(false);
    } catch (err) {
      console.error("Fallo en el registro. " + err);
      setError("Fallo en el registro. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box"> 
      {isRegistering && (
          <FaArrowLeft 
            className="back-icon" 
            onClick={() => setIsRegistering(false)} 
          />
        )}
        <img src="../../public/columbia-viajesv2.png" alt="columbia-viajes.png not found..." className="logo"/>
        <h2>{isRegistering ? "Registrarse" : "Iniciar Sesión"}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          {isRegistering ? (
            <>
              <input type="text" placeholder="Nombre" value={nombre} 
                onChange={(e) => setNombre(e.target.value)} required
              />
              <input type="text" placeholder="Apellido" value={apellido} 
                onChange={(e) => setApellido(e.target.value)} required
              />
              <input type="email" placeholder="Correo Electrónico" value={email} 
                onChange={(e) => setEmail(e.target.value)} required
              />
              <input type="password" placeholder="Contraseña" value={password} 
                onChange={(e) => setPassword(e.target.value)} required
              />
              <input type="text" placeholder="Dirección" value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} required
              />
              <input type="tel" placeholder="Teléfono" value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} required
              />
            </>
          ) : (
            <>
              <input type="email" placeholder="Correo Electrónico" value={email} 
                onChange={(e) => setEmail(e.target.value)} required
              />
              <input type="password" placeholder="Contraseña" value={password} 
                onChange={(e) => setPassword(e.target.value)} required
              />
            </>
          )}
          <button type="submit">{isRegistering ? "Registrarse" : "Entrar"}</button>
        </form>
        {!isRegistering && (
          <button className="register-button" onClick={() => setIsRegistering(true)}>
            Registrarse
          </button>
        )}
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Login;
