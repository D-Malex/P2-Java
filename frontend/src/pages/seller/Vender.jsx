import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import NavBar from "./NavBar";
import Footer from "../Footer";
import "./styles/Vender.css";

const Vender = () => {
  const [vuelos, setVuelos] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [sucursal, setSucursal] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [pension, setPension] = useState("SIMPLE");
  const [claseVuelo, setClaseVuelo] = useState("ECONOMICA");
  const [fechaRetorno, setFechaRetorno] = useState("");
  const [precio, setPrecio] = useState(0);

  const vendedor = JSON.parse(localStorage.getItem("usuario"));
  
  useEffect(() => {
    const fetchSucursal = async () => {
        const vendedor = JSON.parse(localStorage.getItem("usuario"));
        const response = await api.get(`/sucursales/${vendedor.id_sucursal}`);
        setSucursal(response.data);
    };

    fetchSucursal();
}, []);

  // Obtener todos los vuelos disponibles
  useEffect(() => { 
    api.get("/vuelos").then((response) => setVuelos(response.data)); 
    api.get("/usuarios/rol/4").then((response) => setUsuarios(response.data)); // TRAE TODOS LOS TURISTAS
  }, []);

  const calcularDiasExtra = (fechaLlegada, fechaRetorno) => {
    const fechaInicio = new Date(fechaLlegada);
    const fechaFin = new Date(fechaRetorno);
  
    // Verifica que la fecha de retorno sea válida
    if (isNaN(fechaInicio) || isNaN(fechaFin) || fechaFin <= fechaInicio) {
      return 0;
    }
  
    // Calcula la diferencia en días
    const diferenciaTiempo = fechaFin - fechaInicio;
    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Días
  };

  const handleVueloChange = (idVuelo) => {
    const vuelo = vuelos.find((v) => v.id_vuelo === parseFloat(idVuelo));
    setVueloSeleccionado(vuelo);
    setHoteles([]);
    setHotelSeleccionado(null);

    // Obtener hoteles disponibles en el destino del vuelo seleccionado
    if (vuelo) {api.get(`/hoteles/?ciudad=${vuelo.destino}`).then((response) => setHoteles(response.data));}
  };

  const calcularPrecio = () => {
    if (!vueloSeleccionado || !hotelSeleccionado || !fechaRetorno) return;

    let basePrecio = vueloSeleccionado.plazasTurista * 10; // Precio base por vuelo

    if (claseVuelo === "PRIMERA") basePrecio *= 2;
    if (pension === "MEJOR") basePrecio += 200;

    // Calcula días extra
    const diasExtra = calcularDiasExtra(vueloSeleccionado.fecha, fechaRetorno);
    const costoDiaExtra = 50; // Ejemplo: costo por día extra

    // Agrega el costo de los días extra al precio
    const precioFinal = basePrecio + diasExtra * costoDiaExtra;

    setPrecio(precioFinal);
  };

  const handleVender = () => {
    if (!usuarioSeleccionado?.id_usuario || !vueloSeleccionado?.id_vuelo || !hotelSeleccionado?.id_hotel || !sucursal?.id_sucursal) {
      alert("Algunos datos esenciales no están seleccionados. Verifica la información ingresada.");
      return;
  }

    const fechaActual = new Date();
    const fechaInicio = new Date(vueloSeleccionado.fecha);
    const fechaFin = new Date(fechaRetorno);

    // Validación de fechas
    if (fechaFin < fechaActual) {
      alert("La fecha de retorno no puede ser anterior a la fecha actual.");
      return;
    } else if (fechaFin <= fechaInicio) {
      alert("La fecha de retorno debe ser posterior a la fecha de llegada del vuelo.");
      return;
    }


    // Crear el viaje
    const viaje = {
      sucursal: sucursal, // Solo ID
      usuario: usuarioSeleccionado, // Solo ID
      hotel: hotelSeleccionado, // Solo ID
      pensionHotel: pension,
      vuelo: vueloSeleccionado, // Solo ID
      claseVuelo,
      fechaLlegada: vueloSeleccionado.fecha,
      fechaRetorno,
      precio,
  };

    api.post("/viajes/new", viaje).then((viajeResponse) => {
      // Crear la venta asociada al viaje
      const venta = {
        vendedor,
        viaje: viajeResponse.data,
        fechaVenta: new Date().toISOString(),
      };
      console.log("Viaje creado" + viaje);

      api.post("/ventas/new", venta).then(() => {
        alert("Venta realizada exitosamente");
      });
    });
  };



  return (
    <>
    <NavBar />
      <div className="vender-container">
    <h1>Vender Viaje</h1>
    <div className="form-group">
  <label>Seleccione un usuario:</label>
  <input className="input_especial"
    list="usuarios"
    onChange={(e) => {
      const selectedUser = usuarios.find((u) => u.email === e.target.value);
      setUsuarioSeleccionado(selectedUser);
    }}
  />
  <datalist id="usuarios">
    {usuarios.map((usuario) => (
      <option key={usuario.email} value={usuario.email}>
        {usuario.nombre} {usuario.apellido} ({usuario.email})
      </option>
    ))}
  </datalist>
</div>
    <div className="form-group">
      <label>Seleccione un vuelo:</label>
      <select onChange={(e) => handleVueloChange(e.target.value)}>
        <option value="">-- Seleccione un vuelo --</option>
        {vuelos.map((vuelo) => (
          <option key={vuelo.id_vuelo} value={vuelo.id_vuelo}>
            {vuelo.origen} ➡️ {vuelo.destino} ({vuelo.fecha})
          </option>
        ))}
      </select>
    </div>

    {vueloSeleccionado && (
      <>
        <div className="form-group">
          <label>Seleccione un hotel:</label>
          <select
            onChange={(e) =>
              setHotelSeleccionado(hoteles.find((h) => h.id_hotel === parseInt(e.target.value)))
            }
          >
            <option value="">-- Seleccione un hotel --</option>
            {hoteles.map((hotel) => (
              <option key={hotel.id_hotel} value={hotel.id_hotel}>
                {hotel.nombre} ({hotel.direccion})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Clase de vuelo:</label>
          <select onChange={(e) => setClaseVuelo(e.target.value)}>
            <option value="ECONOMICA">Económica</option>
            <option value="PRIMERA">Primera</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pensión del hotel:</label>
          <select onChange={(e) => setPension(e.target.value)}>
            <option value="SIMPLE">Simple</option>
            <option value="MEJOR">Mejor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de retorno:</label>
          <input class="input_especial"
            type="date"
            onChange={(e) => setFechaRetorno(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Días extra:</label>
          <p>{calcularDiasExtra(vueloSeleccionado.fecha, fechaRetorno)} días</p>
        </div>


        <div className="form-group">
          <button onClick={calcularPrecio}>Calcular Precio</button>
          <p>Precio: ${precio}</p>
        </div>

        <div className="form-group">
          <button onClick={handleVender}>Vender</button>
        </div>
      </>
    )}
  </div>
    <Footer />
    </>
  );
};

export default Vender;
