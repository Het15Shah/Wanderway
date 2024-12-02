import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = () => {
      const token = Cookies.get("token");
      if (!token) navigate("/login");
    };

    authenticateUser();
  }, []);

  return (
    <>
      <div>
        <Component />
      </div>
    </>
  );
}

export default ProtectedRoute;
