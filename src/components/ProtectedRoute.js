// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path based on your project structure

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Assuming you have a currentUser in your AuthContext

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
