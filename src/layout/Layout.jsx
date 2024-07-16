import { useContext, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);

  console.log(user);

  const { data, isLoading } = useQuery({
    queryKey: ["single-user-data"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user}`);
      return res.data;
    },
    enabled: !!user,
  });

  if (loading || isLoading)
    return <p className="text-6xl">Loading..........</p>;

  console.log(data);

  //   toogle bar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`flex flex-col w-80 h-screen px-5 py-8 overflow-y-auto bg-green-color border-r rtl:border-r-0 rtl:border-l fixed lg:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        {/* Close button for mobile */}
        <button className="lg:hidden self-end p-2" onClick={toggleSidebar}>
          <IoClose size={24} color="#fff" />
        </button>

        <Link to={"/"}>
          {/* <img
            className="w-auto h-14 mx-auto"
            src="https://i.ibb.co/2qtgY2Z/445379615-331727106468525-5982881440624507647-n.png"
            alt=""
          /> */}
          <p className="text-3xl text-center font-bold text-white">BengalPay</p>
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-3 "></nav>
        </div>

        {/* Footer logout btn */}
        <div className="pb-10">
          <button
            onClick={() => logout()}
            className="flex w-full items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 bg-green-800 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <CiLogout size={20} color="#fff" />
            <span className="mx-2 text-sm font-medium text-white">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-4 focus:outline-none focus:bg-gray-200"
          onClick={toggleSidebar}
        >
          <IoMenu size={24} />
        </button>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
