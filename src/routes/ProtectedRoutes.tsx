import { JSX } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!secureLocalStorage.getItem("userId");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
