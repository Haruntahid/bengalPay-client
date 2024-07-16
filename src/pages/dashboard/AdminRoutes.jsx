import { NavLink } from "react-router-dom";
import users from "../../assets/users.png";
import analysis from "../../assets/analysis.png";

function AdminRoutes() {
  return (
    <>
      <NavLink
        to={"/user-management"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg bg-black"
            : "flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg bg-green-400"
        }
      >
        <img className="w-5 h-5" src={users} alt="" />
        <span className="mx-2 font-medium">User Management</span>
      </NavLink>

      <NavLink
        to={"/overview"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg bg-black"
            : "flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg bg-green-400"
        }
      >
        <img className="w-5 h-5" src={analysis} alt="" />
        <span className="mx-2 font-medium">Overview</span>
      </NavLink>
    </>
  );
}

export default AdminRoutes;
