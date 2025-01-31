import React from "react";
import "./styles/Home.css";

function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return (
    <>
      <div id="owner-home-image">
        <h1 id="owner-home-title">Welcome, {usuario.nombre}</h1>
      </div>
    </>
  );
}

export default Home;
