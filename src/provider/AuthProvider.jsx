import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log(decodedToken);
        const { name } = decodedToken;
        setUser(name); // Set user as email or phone from token
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false after handling token
      }
    } else {
      setUser(null);
      setLoading(false); // No token, set loading to false
    }
  }, []);

  const login = (userData) => {
    setLoading(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
