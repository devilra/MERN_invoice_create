import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMe } from "../redux/Slices/authSlice";

const ProtectedRoutes = ({ children }) => {
  //const [loading, setLoading] = useState(true)

  //const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    console.log("Loading Run");
    return <p>Loading...</p>;
  }

  console.log(user);

  if (!user) {
    console.log("No User");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
