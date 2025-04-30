import { JSX } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!secureLocalStorage.getItem("userId");
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
