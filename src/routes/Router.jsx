import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../layout/Layout";
import PrivateRoute from "./PrivateRoute";
import Services from "../components/Services";
import TrxManagement from "../components/agent/TrxManagement";
import Overview from "../components/admin/Overview";
import UserManagement from "../components/admin/UserManagement";
import Consumer from "../components/admin/Consumer";
import Admins from "../components/admin/Admins";
import Agents from "../components/admin/Agents";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />,
      </PrivateRoute>
    ),
    children: [
      // users
      {
        path: "/services",
        element: <Services />,
      },

      //   agent
      {
        path: "/transaction-management",
        element: <TrxManagement />,
      },
      //   admin
      {
        path: "/user-management",
        element: <UserManagement />,
      },
      {
        path: "/consumer",
        element: <Consumer />,
      },
      {
        path: "/agent",
        element: <Agents />,
      },
      {
        path: "/admin",
        element: <Admins />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
