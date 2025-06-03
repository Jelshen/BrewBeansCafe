import { useState, useEffect } from "react";
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
          <ul className="flex justify-end gap-10 text-sm lg:text-lg">
            <li>
              <a href="/" className="hover:text-[var(--color-highlight)]">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-[var(--color-highlight)]">
                Menu
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[var(--color-highlight)]">
                About
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="hover:text-[var(--color-highlight)]"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-[var(--color-highlight)]"
              >
                Contact
              </a>
            </li>
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
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
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
              <ul className="flex flex-col place-items-end gap-4 p-16 text-lg">
                <li>
                  <a href="/" className="hover:text-[var(--color-accent)]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/menu" className="hover:text-[var(--color-accent)]">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-[var(--color-accent)]">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    className="hover:text-[var(--color-accent)]"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-[var(--color-accent)]"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
