import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (token && role && userId) {
      setToken(token);
      setRole(role);
      setUserId(userId);
    }

    setLoading(false);
  }, []);

  const login = (role, userId, jwtToken) => {
    setRole(role);
    setToken(jwtToken);
    setUserId(userId);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    setUserId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{ role, token, userId, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
