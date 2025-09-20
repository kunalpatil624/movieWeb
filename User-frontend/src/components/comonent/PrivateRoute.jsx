import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, openModal }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login&signup"); 
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return children;
};

export default PrivateRoute;
