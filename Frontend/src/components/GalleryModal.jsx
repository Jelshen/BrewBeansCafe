import React from "react";
import { createPortal } from "react-dom";

const GalleryModal = ({ image, title, description, toggleModal }) => {
  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
      <div
        className="relative bg-[var(--color-background)] rounded-2xl 
        overflow-hidden w-xs md:w-sm lg:w-xl h-xl md:h-88 lg:h-128 mx-4"
      >
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-[var(--color-accent)] 
                hover:text-[var(--color-highlight)] z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex justify-center">
          <img
            className="w-full h-48 md:h-60 lg:h-88 object-cover"
            src={image}
            alt={title}
          />
        </div>

        <div className="p-4 lg:p-8 flex flex-col flex-grow">
          <h2 className="text-xs md:text-lg lg:text-2xl font-bold mb-4 text-[var(--color-text)]">
            {title}
          </h2>
          <p className="text-[var(--color-text)] text-xs md:text-sm lg:text-xl lg:mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("app"));
};

export default GalleryModal;
