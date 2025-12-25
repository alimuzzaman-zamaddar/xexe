import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import type { ReactNode } from "react";
import Loader from "../components/Loader/Loader";

// Custom route guard component for private routes
const PrivateRoute = ({ children, allowedRoles }: { children: ReactNode; allowedRoles: string[] }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // While the user data is loading, show a loading screen or spinner
  if (loading) {
    return <div><Loader className="mt-10 text-3xl text-blue-500" /></div>; // You can replace this with a spinner
  }

  // If user is not authenticated, redirect to login
  if (!token || !user ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user role doesn't match the allowed roles, redirect to unauthorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Allow access if the role matches
  return children;
};

export default PrivateRoute;

