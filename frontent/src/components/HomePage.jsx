import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import DashboardNavbar from "../Dashboard/DashboardNavbar";

const HomePage = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row  ">
      {/* Left Sidebar - Desktop only */}
      <div className=" lg:flex w-full md:sticky top-5  md:w-1/5 md:h-[100vh] bg-white shadow-md p-4">
        <div className=" text-gray-600 md:w-full flex items-center md:items-start justify-between md:justify-start md:flex md:flex-col font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `cursor-pointer px-2  py-2 rounded md:rounded-xl md:px-10 md:py-3 mt-4 ${
                isActive
                  ? " md:border-l-8 md:border-black  bg-black md:bg-white text-white md:text-black  py-1  font-extrabold "
                  : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              `cursor-pointer px-2  py-2 rounded md:rounded-xl md:px-10 md:py-3 mt-4 ${
                isActive
                  ? " md:border-l-8 md:border-black  bg-black md:bg-white text-white md:text-black  py-1  font-extrabold "
                  : ""
              }`
            }
          >
            Invoices
          </NavLink>
          {/* <NavLink
            to="/customer"
            className={({ isActive }) =>
              `cursor-pointer px-2  py-2 rounded md:rounded-xl md:px-10 md:py-3 mt-4 ${
                isActive
                  ? " md:border-l-8 md:border-black  bg-black md:bg-white text-white md:text-black  py-1  font-extrabold "
                  : ""
              }`
            }>
            Customers
          </NavLink> */}
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              `cursor-pointer px-2  py-2 rounded md:rounded-xl md:px-10 md:py-3 mt-4 ${
                isActive
                  ? " md:border-l-8 md:border-black  bg-black md:bg-white text-white md:text-black  py-1  font-extrabold "
                  : ""
              }`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `cursor-pointer px-2 py-2 rounded md:rounded-xl md:px-10 md:py-3 mt-4 ${
                isActive
                  ? "md:border-l-8 md:border-black bg-black md:bg-white text-white md:text-black py-1 font-extrabold"
                  : ""
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>

      {/* Right Sidebar - Desktop only */}
      <div className=" w-full md:h-[100%]  bg-white ">
        <DashboardNavbar />
        <div className="text-gray-500 pb-20 md:pb-0  h-[100%] md:h-[100%]  font-medium">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
