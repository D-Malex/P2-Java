import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  // Si no hay token, redirige al login
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, muestra el contenido de la ruta protegida
  return children;
};

export default ProtectedRoute;
