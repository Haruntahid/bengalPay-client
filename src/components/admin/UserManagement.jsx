import totalUser from "../../assets/totalUser.png";
import agents from "../../assets/agents.png";
import admin from "../../assets/administrator.png";
import pending from "../../assets/pending.png";
import blocked from "../../assets/block.png";
import { Link } from "react-router-dom";

function UserManagement() {
  return (
    <>
      <p className="text-5xl font-bold text-green-color mt-10">Users</p>
      <div className="grid grid-cols-5 items-center gap-5 mt-10">
        <Link
          to={"/consumer"}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
        >
          <img className="w-24 h-24" src={totalUser} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Consumers</p>
        </Link>
        <Link
          to={"/agent"}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
        >
          <img className="w-24 h-24" src={agents} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Agents</p>
        </Link>
        <Link
          to={"/admin"}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
        >
          <img className="w-24 h-24" src={admin} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Admins</p>
        </Link>
        <Link
          to={"/blocked"}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
        >
          <img className="w-24 h-24" src={blocked} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Blocked Account</p>
        </Link>
      </div>

      {/* pending section */}
      <p className="text-5xl font-bold text-green-color mt-10">
        Pending Account
      </p>
      <div className="grid grid-cols-5 items-center gap-5 mt-10">
        <Link
          to={"/pending"}
          className="p-5 bg-green-300 flex flex-col items-center rounded-lg transition-all duration-400 transform hover:bg-green-color hover:text-white"
        >
          <img className="w-24 h-24" src={pending} alt="cash-in-request" />
          <p className="mt-2 text-xl font-semibold">Users in Pending</p>
        </Link>
      </div>
    </>
  );
}

export default UserManagement;
