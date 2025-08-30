import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import InvoicesList from "./components/InvoicesList";
import NewBill from "./components/NewBill";
import Navbar from "./components/Navbar";
import InvoiceView from "./components/InvoiceView";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/Slices/authSlice";
import NotFound from "./components/NotFound";
import Dashboard from "./Dashboard/Dashboard";
import Customers from "./Dashboard/Customers";
import API from "./api";
import Setting from "./Dashboard/Setting";

const App = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const location = useLocation();

  const noNavbarRoutes = ["/login", "/register"];
  const validRoutes = ["/", "/invoices", "/new", "/invoice"];

  const is404 = !validRoutes.some((path) => location.pathname.startsWith(path));

  const shouldNavbar = noNavbarRoutes.includes(location.pathname) || is404;

  return (
    <>
      {!shouldNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customer" element={<Customers />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route
          path="/invoices"
          element={
            <ProtectedRoutes>
              <InvoicesList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoutes>
              <NewBill />
            </ProtectedRoutes>
          }
        />
        <Route path="/invoice/:id" element={<InvoiceView />} />
        <Route path="/new/:invoiceId" element={<NewBill />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
