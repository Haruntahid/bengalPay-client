import { NavLink } from "react-router-dom";
import services from "../../assets/service.png";

function UserRoutes() {
  return (
    <>
      <NavLink
        to={"/services"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg bg-black"
            : "flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg bg-green-400"
        }
      >
        <img className="w-5 h-5" src={services} alt="" />
        <span className="mx-2 font-medium">Services</span>
      </NavLink>
    </>
  );
}

export default UserRoutes;
