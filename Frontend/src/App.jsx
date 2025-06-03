import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";

// Import Components
import Navbar from "./components/Navbar.jsx";

// Import Assets
import background from "./assets/background/background.jpg";

export default function App() {
  return (
    <div className="font-display bg-[var(--color-background)]" id="app">
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{}} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}
