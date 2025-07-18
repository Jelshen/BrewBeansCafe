import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavClick, setMobileNavClick] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle link click - scroll to top and close mobile nav
  const handleLinkClick = () => {
    setMobileNavClick(false);
  };

  return (
    <div className="sticky top-0 z-50 flex items-center p-8 min-w-screen text-[var(--color-text)] bg-linear-100 from-[var(--color-accent)] to-[var(--color-background)]">
      <div className="flex items-center gap-2 lg:gap-4">
        <img src={logo} className={`h-auto w-10 lg:w-16`} />
        <h1 className="text-[var(--color-primary)] tracking-normal text-sm lg:text-2xl font-bold">
          BrewBeans
        </h1>
      </div>

      {/* Web Navbar */}
      {!isMobile ? (
        <nav className="w-full">
          <ul className="flex justify-end md:gap-4 lg:gap-10 text-sm lg:text-lg">
            <Link
              to="/"
              className={`flex items-center gap-2 hover:text-[var(--color-highlight)] transition-colors duration-200 ${
                location.pathname === "/"
                  ? "text-[var(--color-highlight)] border-b-2"
                  : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/menu"
              className={`flex items-center gap-2 hover:text-[var(--color-highlight)] transition-colors duration-200 ${
                location.pathname === "/menu"
                  ? "text-[var(--color-highlight)] border-b-2"
                  : ""
              }`}
            >
              Menu
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2 hover:text-[var(--color-highlight)] transition-colors duration-200 ${
                location.pathname === "/about"
                  ? "text-[var(--color-highlight)] border-b-2"
                  : ""
              }`}
            >
              About
            </Link>

            <Link
              to="/gallery"
              className={`flex items-center gap-2 hover:text-[var(--color-highlight)] transition-colors duration-200 ${
                location.pathname === "/gallery"
                  ? "text-[var(--color-highlight)] border-b-2"
                  : ""
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-2 hover:text-[var(--color-highlight)] transition-colors duration-200 ${
                location.pathname === "/contact"
                  ? "text-[var(--color-highlight)] border-b-2"
                  : ""
              }`}
            >
              Contact
            </Link>
          </ul>
        </nav>
      ) : (
        // If not web
        // Mobile Navbar
        <div className="flex justify-end w-full">
          <button
            onClick={() => setMobileNavClick(!mobileNavClick)}
            className={`z-51 flex items-center justify-center w-10 h-10 bg-[var(--color-accent)] rounded-full active:scale-110 transition-transform duration-150`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-white transition-transform duration-300 ${
                mobileNavClick ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileNavClick
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          {/* Mobile Nav with smooth transition */}
          <div
            className={`fixed top-0 right-0 h-full w-full bg-[var(--color-background)] transform ${
              mobileNavClick ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-350 ease-in-out z-50`}
          >
            <nav className="py-7 mt-4 h-full">
              <ul className="flex flex-col place-items-end gap-6 p-16 text-lg">
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 transition-colors duration-200 ${
                    location.pathname === "/"
                      ? "text-[var(--color-highlight)] border-b-2 border-[var(--color-highlight)] pb-1"
                      : "hover:text-[var(--color-highlight)] active:text-[var(--color-highlight)]"
                  }`}
                >
                  Home
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <Link
                  to="/menu"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 transition-colors duration-200 ${
                    location.pathname === "/menu"
                      ? "text-[var(--color-highlight)] border-b-2 border-[var(--color-highlight)] pb-1"
                      : "hover:text-[var(--color-highlight)] active:text-[var(--color-highlight)]"
                  }`}
                >
                  Menu
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 transition-colors duration-200 ${
                    location.pathname === "/about"
                      ? "text-[var(--color-highlight)] border-b-2 border-[var(--color-highlight)] pb-1"
                      : "hover:text-[var(--color-highlight)] active:text-[var(--color-highlight)]"
                  }`}
                >
                  About
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                <Link
                  to="/gallery"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 transition-colors duration-200 ${
                    location.pathname === "/gallery"
                      ? "text-[var(--color-highlight)] border-b-2 border-[var(--color-highlight)] pb-1"
                      : "hover:text-[var(--color-highlight)] active:text-[var(--color-highlight)]"
                  }`}
                >
                  Gallery
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 transition-colors duration-200 ${
                    location.pathname === "/contact"
                      ? "text-[var(--color-highlight)] border-b-2 border-[var(--color-highlight)] pb-1"
                      : "hover:text-[var(--color-highlight)]"
                  }`}
                >
                  Contact
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
