import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import Pages
import AdminScreen from "./pages/AdminScreen.jsx";

// Import Components
import Navbar from "./components/Navbar.jsx";
import AnimatedRoute from "./components/AnimatedRoute.jsx";

// Import Assets
import background from "./assets/background/background.jpg";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    // Only render the admin screen, no main layout
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="font-display bg-[var(--color-background)]" id="app">
      <div
        id="scroll-container"
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AnimatedRoute />
      </div>
    </div>
  );
}
