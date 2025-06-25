import React from "react";

import { useState, cloneElement } from "react";
import LoginForm from "./LoginForm";
import AdminScreen from "../pages/AdminScreen";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

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
