import React, { useState, useEffect, cloneElement } from "react";
import Swal from "sweetalert2";
import LoginForm from "./Admin/LoginForm.jsx";
import authenticate from "../api/authenticate.js";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    const checkAuth = async () => {
      Swal.fire({
        title: "Checking authentication...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const data = await authenticate.check();
        setAuth(true);
        setUsername(data.username);
      } catch (err) {
        setAuth(false);
      } finally {
        setLoading(false);
        Swal.close(); // Close loading popup
      }
    };

    checkAuth();
  }, []);

  if (loading) return null; // Prevent rendering during loading check

  if (auth) {
    return cloneElement(children, { username: username });
  }

  return (
    <div>
      <LoginForm
        onLoginSuccess={(username) => {
          setAuth(true);
          setUsername(username);
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
