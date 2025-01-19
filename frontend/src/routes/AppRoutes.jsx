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
  // Recuperar el userType del localStorage
  const userType = JSON.parse(localStorage.getItem("userType"));

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
        
        {userType.nombre === "DUENIO" && (
          <Route path="/home" element={<ProtectedRoute><OwnerHome /></ProtectedRoute>} />
          /* RUTAS DEL DUEÑO */
        )}
        
        {userType && userType.nombre === "ADMINISTRADOR" && (
          <Route path="/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          /* RUTAS DEL ADMIN */
        )}

        {userType && userType.nombre === "VENDEDOR" && (
          <Route path="/home" element={<ProtectedRoute><SellerHome /></ProtectedRoute>} />
          /* RUTAS DEL VENDEDOR */
        )}

        {userType && userType.nombre === "TURISTA" && (
          <Route path="/home" element={<ProtectedRoute><TouristHome /></ProtectedRoute>} />
          /* RUTAS DEL TURISTA */
        )}
        
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
