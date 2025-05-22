import { jwtDecode } from "jwt-decode";
import * as React from "react";
import { useNavigate } from "react-router";

export default function NotAuthorized() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role = null; // Default to null to avoid undefined error

  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode only if token is present
      role = decoded.role;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  React.useEffect(() => {
    if (role === "user") {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (role === "admin") {
      setTimeout(() => {
        navigate("/adminhome");
      }, 2000);
    } else if (role === "superadmin") {
      setTimeout(() => {
        navigate("/adminhome");
      }, 2000);
    } else {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [role]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Access Forbidden
        </h1>
        <p className="text-lg text-gray-700">
          You do not have permission to access this page.
        </p>
        <p className="text-gray-600 mt-2">
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
}
