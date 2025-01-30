import React from "react";
import "./styles/Home.css";

function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return (
    <>
      <div id="admin-home-image">
      <h1 id="admin-home-title">Welcome, {usuario.nombre}</h1>
      </div>
    </>
  );
}

export default Home;