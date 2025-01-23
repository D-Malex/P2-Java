import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import OwnerHome from "../pages/owner/Home";
import AdminHome from "../pages/admin/AdminHome";
import SellerHome from "../pages/seller/Home";
import TouristHome from "../pages/tourist/Home";
import TouristProfile from "../pages/tourist/Profile";
import TouristSucursales from "../pages/tourist/Sucursales";
import TouristViajes from "../pages/tourist/Viajes";
import "./styles/App.css"
import "./styles/index.css"

function AppRoutes() {
  const userType = JSON.parse(localStorage.getItem("userType"));

  // Renderizar rutas basadas en el rol del usuario
  const getHomeRoutes = () => {
    if (!userType) {
      console.log("Aun no se validaron las credenciales.");
      return null; 
    } else {
      console.log("Crendenciales validas, redireccionando...");
    }

    switch (userType.nombre) {
      case "DUENIO":
        return (
          <Route path="/home" element={ <ProtectedRoute> <OwnerHome /> </ProtectedRoute> } />
        );
      case "ADMINISTRADOR":
        return (
          <Route path="/home" element={ <ProtectedRoute> <AdminHome /> </ProtectedRoute> } />
        );
      case "VENDEDOR":
        return (
          <Route path="/home" element={ <ProtectedRoute> <SellerHome /> </ProtectedRoute> } />
        );
      case "TURISTA":
        return (
        <>
            <Route path="/home" element={ <ProtectedRoute> <TouristHome /> </ProtectedRoute> } />
            <Route path="/profile" element={ <ProtectedRoute> <TouristProfile /> </ProtectedRoute>} />
            <Route path="/sucursales" element={ <ProtectedRoute> <TouristSucursales /> </ProtectedRoute>} />
            <Route path="/trips" element={ <ProtectedRoute> <TouristViajes /> </ProtectedRoute>} />
        </>
        );
      default:
        console.error("ERROR: "+ userType.nombre+",no es reconocido como un rol de usuario valido.");
        return null; 
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {getHomeRoutes()}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;