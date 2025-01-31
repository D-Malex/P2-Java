import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import "./styles/Vender.css";

const Vender = () => {
  const [vuelos, setVuelos] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [sucursal, setSucursal] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [pension, setPension] = useState("MEDIA");
  const [claseVuelo, setClaseVuelo] = useState("TURISTA");
  const [fechaRetorno, setFechaRetorno] = useState("");
  const [precio, setPrecio] = useState(0);

  const vendedor = JSON.parse(localStorage.getItem("usuario"));
  
  useEffect(() => {
    const fetchSucursal = async () => {
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

  const calcularPrecio = async () => {
    if (!vueloSeleccionado || !hotelSeleccionado || !fechaRetorno) return;

    let basePrecio = vueloSeleccionado.plazasTurista * 10; // Precio base por vuelo

    if (claseVuelo === "PRIMERA") basePrecio *= 2;
    if (pension === "COMPLETA") basePrecio += 200;

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

    if (hotelSeleccionado.plazasDisponibles <= 0) {
      alert("No hay plazas disponibles en el hotel seleccionado.");
      return;
    }
    
    if (claseVuelo === "TURISTA" && vueloSeleccionado.plazasTurista <= 0) {
      alert("No hay plazas disponibles en clase turista.");
      return;
    } else if (claseVuelo === "PRIMERA" && vueloSeleccionado.plazasTotales <= 0) {
      alert("No hay plazas disponibles en clase primera.");
      return;
    }
    

    if(confirm("¿Seguro que quiere vender este viaje? Verifique los datos.")) {
      // Crear el viaje
      const viaje = {
        sucursal: sucursal,
        usuario: usuarioSeleccionado,
        hotel: hotelSeleccionado,
        pensionHotel: pension,
        vuelo: vueloSeleccionado,
        claseVuelo,
        fechaLlegada: vueloSeleccionado.fecha,
        fechaRetorno,
        precio,
      };

      // Crear la venta asociada al viaje
      api.post("/viajes/new", viaje).then((viajeResponse) => {
        const venta = { vendedor, viaje: viajeResponse.data, fechaVenta: new Date().toISOString(),};
        console.log("Viaje creado" + viaje);

        api.post("/ventas/new", venta).then(() => { 
          // Actualizar las plazas disponibles
          actualizarPlazasHotel(hotelSeleccionado.id_hotel);
          actualizarPlazasVuelo(vueloSeleccionado.id_vuelo, claseVuelo);
          alert("Venta realizada exitosamente");
        });
      });
    }
  };

  const actualizarPlazasHotel = async (idHotel) => {
    try {
      const response = await api.get(`/hoteles/${idHotel}`);
      const hotel = response.data;
      const plazasActualizadas = hotel.plazasDisponibles - 1;
      await api.put(`/hoteles/${idHotel}`, {
        ...hotel,
        plazasDisponibles: plazasActualizadas,
      });
  
      console.log("Plazas del hotel actualizadas correctamente.");
    } catch (error) {
      console.error("Error al actualizar las plazas del hotel:", error);
    }
  };

  const actualizarPlazasVuelo = async (idVuelo, claseVuelo) => {
    try {
      const response = await api.get(`/vuelos/${idVuelo}`);
      const vuelo = response.data;
  
      // Disminuir las plazas según la clase seleccionada
      if (claseVuelo === "TURISTA") {
        vuelo.plazasTotales -= 1;
        vuelo.plazasTurista -= 1;
      } else if (claseVuelo === "PRIMERA") {
        vuelo.plazasTotales -= 1;
      }
  
      await api.put(`/vuelos/${idVuelo}`, {
        ...vuelo,
        plazasTotales: vuelo.plazasTotales,
        plazasTurista: vuelo.plazasTurista,
      });
  
      console.log("Plazas del vuelo actualizadas correctamente.");
    } catch (error) {
      console.error("Error al actualizar las plazas del vuelo:", error);
    }
  };

  return (
    <>
      <div className="vender-container">
        <h1>Vender Viaje</h1>

        <div>
          <label>Seleccione un usuario:</label>
          <input list="usuarios" onChange={(e) => {
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
        <div>
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
            <div>
              <label>Seleccione un hotel:</label>
              <select onChange={(e) => setHotelSeleccionado(hoteles.find((h) => h.id_hotel === parseInt(e.target.value)))}>
                <option value="">-- Seleccione un hotel --</option>
                  {hoteles.map((hotel) => (
                  <option key={hotel.id_hotel} value={hotel.id_hotel}>
                    {hotel.nombre} ({hotel.direccion})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Clase de vuelo:</label>
              <select onChange={(e) => setClaseVuelo(e.target.value)}>
                <option value="TURISTA">Turista</option>
                <option value="PRIMERA">Primera</option>
              </select>
            </div>
            <div>
              <label>Pensión del hotel:</label>
              <select onChange={(e) => setPension(e.target.value)}>
                <option value="MEDIA">Media</option>
                <option value="COMPLETA">Completa</option>
              </select>
            </div>
            <div>
              <label>Fecha de retorno:</label>
              <input type="date" onChange={(e) => setFechaRetorno(e.target.value)} />
            </div>
            <div>
              <label>Días extra:</label>
              <p id="diasExtra">{calcularDiasExtra(vueloSeleccionado.fecha, fechaRetorno)} días</p>
            </div>
            <div>
              <button onClick={calcularPrecio}>Calcular Precio</button>
              <p>Precio: ${precio}</p>
            </div>
            <div>
              <button onClick={handleVender}>Vender</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Vender;
