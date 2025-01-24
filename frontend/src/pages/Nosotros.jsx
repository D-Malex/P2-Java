import React from "react";
import NavBar from "./tourist/NavBar";
import Footer from "./Footer";
import "./styles/Nosotros.css"; 

const Nosotros   = () => {
  return (
    <div className="about-us-container">
      <NavBar />
      <h1>Acerca de Nosotros</h1>
      <p>
        Nuestra misión es ofrecer experiencias únicas de viaje, brindando un
        servicio de calidad y asegurando la satisfacción de nuestros clientes.
      </p>
      <p>
        Nuestro objetivo es ser la agencia líder en turismo, promoviendo destinos
        maravillosos y un servicio excepcional. Nos dedicamos a garantizar que
        cada viaje sea memorable, lleno de aventuras y descubrimientos.
      </p>
      <p>
        Te invitamos a conocer el mundo con nosotros, explorando nuevos
        horizontes y viviendo momentos que nunca olvidarás. ¡Viajar es vivir!
      </p>
      <Footer />
    </div>
  );
};

export default Nosotros;
