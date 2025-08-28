import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../redux/Slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop & tablet navbar - top */}
      <nav className="bg-neutral-900 p-4 md:p-5 relative z-50 hidden md:block">
        <div className="flex justify-between items-center   max-w-7xl mx-auto">
          {/* Left side - Home link */}
          <div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                ` text-[15px] mx-2 font-bold  px-5 py-4 rounded text-center ${
                  isActive ? "bg-white text-black" : "text-neutral-50"
                }  `
              }>
              Home
            </NavLink>
          </div>

          {/* Menu Items */}
          <div className="flex flex-row space-x-4">
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                ` text-[15px] mx-2 font-bold  px-5 py-4 rounded text-center ${
                  isActive ? "bg-white text-black" : "text-neutral-50"
                }  `
              }>
              Invoices List
            </NavLink>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                ` text-[15px] mx-5 font-bold  px-5 py-4 rounded text-center ${
                  isActive ? "bg-white text-black" : "text-neutral-50"
                }  `
              }>
              New Invoice
            </NavLink>
            <button
              onClick={() => dispatch(logoutUser())}
              className="text-neutral-50 text-[14px] border font-bold border-neutral-100 px-5 py-3">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom fixed navbar */}
      <nav className="fixed bottom-0  left-0 right-0 bg-neutral-900 p-2 flex justify-around md:hidden z-50 border-t border-neutral-700">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            ` text-[10px]  font-bold  px-3 py-3 rounded text-center ${
              isActive ? "bg-white text-black" : "text-neutral-50"
            }  `
          }>
          Home
        </NavLink>
        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            ` text-[10px]  font-bold  px-3 py-3 rounded text-center ${
              isActive ? "bg-white text-black" : "text-neutral-50"
            }  `
          }>
          Invoices List
        </NavLink>
        <NavLink
          to="/new"
          className={({ isActive }) =>
            ` text-[10px]  font-bold  px-3 py-3 rounded text-center ${
              isActive ? "bg-white text-black" : "text-neutral-50"
            }  `
          }>
          New Invoice
        </NavLink>
        <button
          onClick={() => dispatch(logoutUser())}
          className={`text-neutral-50 text-[10px]  font-bold  px-3 py-3 rounded text-center`}>
          Logout
        </button>
      </nav>
    </>
  );
};

export default Navbar;
