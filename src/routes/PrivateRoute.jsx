import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );
  }

  console.log(user);

  if (user) {
    return children;
  }

  return (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
