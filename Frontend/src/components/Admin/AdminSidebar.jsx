import React from "react";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const AdminSidebar = ({ isMenu, setIsMenu, handleLogout }) => {
  const [isMobile, setIsMobile] = useState(0);
  const [mobileNavClick, setMobileNavClick] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRender = () => {
    setMobileNavClick(false);
  };

  return (
    <>
      {!isMobile ? (
        <aside className="p-4 w-64 bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)] text-[var(--color-primary)] flex flex-col font-medium">
          <div className="flex flex-col items-center mt-8">
            <img src={logo} className={`h-auto w-10 lg:w-16`} />
            <div className="text-[var(--color-primary)] p-4 text-center text-xl lg:text-2xl font-bold">
              BrewBeans<br></br> Cafe
            </div>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <a
              onClick={() => setIsMenu(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition hover:cursor-pointer ${
                isMenu
                  ? "bg-[var(--color-primary)] text-[var(--color-accent)]"
                  : "hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              Menu
            </a>
            <a
              onClick={() => setIsMenu(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition hover:cursor-pointer ${
                !isMenu
                  ? "bg-[var(--color-primary)] text-[var(--color-accent)]"
                  : "hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-4H5m14 8H5m14 4H5"
                />
              </svg>
              Categories
            </a>
          </nav>
          <div className="mb-8 flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="items-center gap-2 w-[50%] px-3 py-2 
              text-[var(--color-text)]
               font-bold rounded hover:bg-[var(--color-primary)] 
               hover:text-[var(--color-accent)] hover:cursor-pointer
               hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </aside>
      ) : (
        <div className="relative flex justify-start">
          <button
            onClick={() => setMobileNavClick(!mobileNavClick)}
            className={`absolute -left-5 top-1/2 z-51 
                flex items-center justify-center w-12 h-12
                 bg-[var(--color-accent)] rounded-full 
                 active:scale-110 transition-all duration-500 ${
                   mobileNavClick
                     ? "translate-x-62 shadow-xl -left-18"
                     : "translate-x-0"
                 }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-white ${
                mobileNavClick ? "" : "ml-4"
              } transition-all duration-500 ${
                mobileNavClick ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 18l6-6-6-6"
              />
            </svg>
          </button>

          <aside
            className={`fixed top-0 left-0 h-full p-4 w-50 lg:w-64 bg-linear-30 from-[var(--color-accent)] to-[var(--color-background)] 
                 text-[var(--color-primary)] flex flex-col font-medium shadow-lg rounded-lg
                transform transition-all duration-500 ease-in-out z-50 ${
                  mobileNavClick ? "translate-x-0" : "-translate-x-full"
                }`}
          >
            <div className="flex flex-col items-center mt-8">
              <img src={logo} className={`h-auto w-10 lg:w-16`} />
              <div className="text-[var(--color-primary)] p-4 text-center text-xl lg:text-2xl font-bold">
                BrewBeans<br></br> Cafe
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <a
                onClick={() => {
                  setIsMenu(true);
                  handleRender();
                }}
                className={`text-xs md:text-sm flex items-center gap-2 px-3 py-2 rounded transition hover:cursor-pointer ${
                  isMenu
                    ? "bg-[var(--color-primary)] text-[var(--color-accent)]"
                    : "hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                Menu
              </a>
              <a
                onClick={() => {
                  setIsMenu(false);
                  handleRender();
                }}
                className={`text-xs md:text-sm flex items-center gap-2 px-3 py-2 rounded transition hover:cursor-pointer ${
                  !isMenu
                    ? "bg-[var(--color-primary)] text-[var(--color-accent)]"
                    : "hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14-4H5m14 8H5m14 4H5"
                  />
                </svg>
                Categories
              </a>
            </nav>
            <div className="mb-8 flex items-center justify-center">
              <button
                onClick={handleLogout}
                className="text-xs md:text-sm items-center gap-2 w-[50%] px-3 py-2 bg-[var(--color-primary)]
                 text-[var(--color-accent)] font-bold rounded
                 hover:bg-[var(--color-background)] transition"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Overlay */}
          {mobileNavClick && (
            <div
              className="fixed inset-0 backdrop-blur z-40"
              onClick={() => setMobileNavClick(false)}
            />
          )}
        </div>
      )}
      ;
    </>
  );
};

export default AdminSidebar;
