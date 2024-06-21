import React from "react";
import { Navigate } from "react-router-dom";
//import { useAuth } from "./context/AuthContext";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  // const { isAuthenticated } = useAuth();

  const x = true;
  return x ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
