import React from "react";

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Page Imports
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Gallery from "../pages/Gallery.jsx";
import Menu from "../pages/Menu.jsx";
import Contact from "../pages/Contact.jsx";
import Navbar from "./Navbar.jsx";

const AnimatedRoute = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Get the scroll container (the div that's actually scrolling)
          const scrollContainer = document.getElementById("scroll-container");

          if (scrollContainer) {
            // Scroll the container to top, NOT the window
            scrollContainer.scrollTo({ top: 0, behavior: "auto" });
          }
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoute;
