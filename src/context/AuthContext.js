import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem("token", token); // Store the token
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("token"); // Clear the token
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
