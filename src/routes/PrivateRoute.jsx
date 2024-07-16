import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return (
    <>
      <Navigate state={location.pathname} to="/login"></Navigate>;
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
