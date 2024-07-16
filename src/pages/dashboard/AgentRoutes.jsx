import { NavLink } from "react-router-dom";
import trxManagement from "../../assets/transactionManagement.png";

function AgentRoutes() {
  return (
    <>
      <NavLink
        to={"/transaction-management"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg bg-black"
            : "flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg bg-green-400"
        }
      >
        <img className="w-5 h-5" src={trxManagement} alt="" />
        <span className="mx-2 font-medium">Transaction Management</span>
      </NavLink>
    </>
  );
}

export default AgentRoutes;
