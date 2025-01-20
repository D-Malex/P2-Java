import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import OwnerHome from "../pages/Home/OwnerHome";
import AdminHome from "../pages/Home/AdminHome";
import SellerHome from "../pages/Home/SellerHome";
import TouristHome from "../pages/Home/TouristHome";

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
          <Route path="/home" element={ <ProtectedRoute> <TouristHome /> </ProtectedRoute> } />
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