import { jwtDecode } from "jwt-decode";
import * as React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ requiredRoles, children }) {
  const token = localStorage.getItem("token");

  let userRole = null; // Default to null to avoid undefined error

  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode only if token is present
      userRole = decoded.role;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/notauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
