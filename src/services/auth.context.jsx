import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setToken(token);
      setRole(role);
    }

    setLoading(false);
  }, []);

  const login = (role, jwtToken) => {
    setRole(role);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
