import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={ <ProtectedRoute> <About /> </ProtectedRoute> }/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
