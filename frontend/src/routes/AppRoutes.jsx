import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
/*IMPORT GENERAL*/
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Perfil from "../pages/Profile";
/*IMPORT TOURIST PAGES*/
import TLayout from "../pages/tourist/Layout";
import THome from "../pages/tourist/Home";
import TSucursal from "../pages/tourist/Sucursales";
import TViajes from "../pages/tourist/Viajes";
import TNosotros from "../pages/Nosotros";
/*IMPORT SELLER PAGES*/
import SHome from "../pages/seller/Home";
import SPaquetes from "../pages/seller/Paquetes";
import SVuelos from "../pages/seller/Vuelos";
import SHoteles from "../pages/seller/Hoteles";
import SSucursal from '../pages/seller/Sucursal'
import SRegVentas from "../pages/seller/RegistroVentas";
import SVender from "../pages/seller/Vender";
/*IMPORT ADMIN PAGES*/
import AHome from "../pages/admin/AdminHome";
import ASucursales from "../pages/admin/Sucursales";
import AHoteles from "../pages/admin/Hoteles";
import AVuelos from "../pages/admin/Vuelos";
import AVendedores from "../pages/admin/Vendedores";
/*IMPORT OWNER PAGES*/
import OHome from "../pages/owner/Home";
import OSucursales from "../pages/owner/Surusales";
import OVuelos from "../pages/owner/Hoteles";
import OHoteles from "../pages/owner/Vuelos";
import OPersonal from "../pages/owner/Personal";
import ORegistrySales from "../pages/owner/RegistroVentas";


function AppRoutes() {
  const userLogged = JSON.parse(localStorage.getItem("usuario"));

  // Renderizar rutas basadas en el rol del usuario
  const getHomeRoutes = () => {
    if (!userLogged) {
      console.log("No se encontró un usuario autenticado.");
      return <Route path="*" element={<Navigate to="/login" replace />} />; // Redirigir al login si no hay un usuario logeado
    }
    console.log("Usuario autenticado, redireccionando...");

    switch (userLogged.rol.nombre) {
      case "DUENIO": return (
        <>
            <Route path="/home" element={ <ProtectedRoute>            <OHome />           </ProtectedRoute> } />
            <Route path="/profile" element={ <ProtectedRoute>         <Perfil />        </ProtectedRoute> } />
            <Route path="/sucursales" element={ <ProtectedRoute>      <OSucursales />     </ProtectedRoute> } />
            <Route path="/flights" element={ <ProtectedRoute>         <OVuelos />         </ProtectedRoute> } />
            <Route path="/hotels" element={ <ProtectedRoute>          <OHoteles />        </ProtectedRoute> } />
            <Route path="/personel" element={ <ProtectedRoute>        <OPersonal />       </ProtectedRoute> } />
            <Route path="/registry/sales" element={ <ProtectedRoute>  <ORegistrySales />  </ProtectedRoute> } />
        </>
        );
      case "ADMINISTRADOR": return (
        <>
            <Route path="/home" element={ <ProtectedRoute>        <AHome />         </ProtectedRoute> } />
            <Route path="/sucursales" element={ <ProtectedRoute>  <ASucursales />   </ProtectedRoute> } />
            <Route path="/hotels" element={ <ProtectedRoute>      <AHoteles />      </ProtectedRoute> } />
            <Route path="/profile" element={ <ProtectedRoute>     <Perfil />      </ProtectedRoute> } />
            <Route path="/flights" element={ <ProtectedRoute>     <AVuelos />       </ProtectedRoute> } />
            <Route path="/sellers" element={ <ProtectedRoute>     <AVendedores />   </ProtectedRoute> } />
        </>
        );
      case "VENDEDOR": return (
        <>
            <Route path="/home" element={ <ProtectedRoute>             <SHome />      </ProtectedRoute> } />
            <Route path="/packages" element={ <ProtectedRoute>         <SPaquetes />  </ProtectedRoute> } />
            <Route path="/flights" element={ <ProtectedRoute>          <SVuelos />    </ProtectedRoute> } />
            <Route path="/hotels" element={ <ProtectedRoute>           <SHoteles />   </ProtectedRoute> } />
            <Route path="/profile" element={ <ProtectedRoute>          <Perfil />    </ProtectedRoute> } />
            <Route path="/sucursal" element={ <ProtectedRoute>         <SSucursal />  </ProtectedRoute> } />
            <Route path="/registry/sales" element={ <ProtectedRoute>   <SRegVentas /> </ProtectedRoute> } />
            <Route path="/sales" element={ <ProtectedRoute>            <SVender />    </ProtectedRoute> } />
        </>
        );
      case "TURISTA": return (
        <>
          <Route element={<TLayout />}>
            <Route path="/home" element={       <ProtectedRoute> <THome />      </ProtectedRoute> } />
            <Route path="/profile" element={    <ProtectedRoute> <Perfil />    </ProtectedRoute> } />
            <Route path="/sucursales" element={ <ProtectedRoute> <TSucursal />  </ProtectedRoute> } />
            <Route path="/trips" element={      <ProtectedRoute> <TViajes />    </ProtectedRoute> } />
            <Route path="/about-us" element={   <ProtectedRoute> <TNosotros />  </ProtectedRoute> } />
          </Route>
        </>
        );
      default:
        console.error("ERROR: "+ userLogged.rol.nombre +",no es reconocido como un rol de usuario valido.");
        return null; 
    }
  };

  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      {getHomeRoutes()}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;