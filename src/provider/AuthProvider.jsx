import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { name } = decodedToken;
        setUser(name);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    setLoading(true);
    localStorage.setItem("token", token);
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const { name } = decodedToken;
      setUser(name);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
