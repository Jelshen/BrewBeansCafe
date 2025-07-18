import React from "react";

// Import libraries and api
import { useState } from "react";
import authenticate from "../../api/authenticate.js";
import background from "../../assets/background/background.jpg";
import Swal from "sweetalert2";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Call the API
    try {
      const response = await authenticate.login(username, password);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "Welcome!",
          showConfirmButton: true,
        }).then(() => {
          onLoginSuccess(username);
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: err.message,
      });

      console.error("Login error:", err.message);
    }
  };

  return (
    <div
      className="font-display"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-col items-center 
        justify-center h-screen backdrop-blur-lg"
      >
        <h1
          className="text-2xl font-bold mb-4 text-transparent bg-clip-text 
          bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)]"
        >
          Login
        </h1>
        <form
          className="w-[70%] md:w-80 bg-[var(--color-background)] p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-xs md:text-sm font-medium text-[var(--color-primary)] mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-accent)]
              text-[var(--color-primary)] text-xs md:text-sm
              rounded-md focus:outline-none focus:ring focus:ring-[var(--color-accent)]"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-xs md:text-sm font-medium text-[var(--color-primary)] mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-accent)] 
              text-[var(--color-primary)] text-xs md:text-sm
              rounded-md focus:outline-none focus:ring focus:ring-[var(--color-accent)]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-[50%] bg-[var(--color-accent)] text-[var(--color-background)] py-2 
            rounded-md hover:bg-[var(--color-primary)] transition-colors duration-200 mx-auto block
            hover:cursor-pointer text-xs md:text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
