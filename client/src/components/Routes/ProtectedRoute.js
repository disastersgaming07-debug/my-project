import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [token, user, dispatch]); // ✅ Added dependency array

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If loading user data, show nothing (or loading spinner)
  if (!user) {
    return <div>Loading...</div>;
  }

  // User is authenticated, show protected content
  return children;
};

export default ProtectedRoute;