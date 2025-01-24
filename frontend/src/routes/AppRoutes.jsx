import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
/*IMPORT GENERAL*/
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
/*IMPORT TOURIST PAGES*/
import THome from "../pages/tourist/Home";
import TProfile from "../pages/tourist/Profile";
import TSucursal from "../pages/tourist/Sucursales";
import TViajes from "../pages/tourist/Viajes";
import TNosotros from "../pages/Nosotros";
/*IMPORT SELLER PAGES*/
import SHome from "../pages/seller/Home";
import SPaquetes from "../pages/seller/Paquetes";
/*IMPORT ADMIN PAGES*/
import OwnerHome from "../pages/owner/Home";
import AdminHome from "../pages/admin/AdminHome";
/*IMPORT CSS*/
import "./styles/App.css"
import "./styles/index.css"


function AppRoutes() {
  const userType = JSON.parse(localStorage.getItem("userType"));

  // Renderizar rutas basadas en el rol del usuario
  const getHomeRoutes = () => {
    if (!userType) {
      console.log("No se encontró un usuario autenticado.");
      return <Route path="*" element={<Navigate to="/login" replace />} />; // Redirigir al login si no hay userType
    }
    console.log("Usuario autenticado, redireccionando...");

    switch (userType.nombre) {
      case "DUENIO": return (
          <Route path="/home" element={ <ProtectedRoute> <OwnerHome /> </ProtectedRoute> } />
        );
      case "ADMINISTRADOR": return (
          <Route path="/home" element={ <ProtectedRoute> <AdminHome /> </ProtectedRoute> } />
        );
      case "VENDEDOR": return (
        <>
            <Route path="/home" element={ <ProtectedRoute>       <SHome />      </ProtectedRoute> } />
            <Route path="/packages" element={ <ProtectedRoute>   <SPaquetes />  </ProtectedRoute> } />
        </>
        );
      case "TURISTA": return (
        <>
            <Route path="/home" element={       <ProtectedRoute> <THome />      </ProtectedRoute> } />
            <Route path="/profile" element={    <ProtectedRoute> <TProfile />   </ProtectedRoute> } />
            <Route path="/sucursales" element={ <ProtectedRoute> <TSucursal />  </ProtectedRoute> } />
            <Route path="/trips" element={      <ProtectedRoute> <TViajes />    </ProtectedRoute> } />
            <Route path="/about-us" element={   <ProtectedRoute> <TNosotros />  </ProtectedRoute> } />
        </>
        );
      default:
        console.error("ERROR: "+ userType.nombre+",no es reconocido como un rol de usuario valido.");
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