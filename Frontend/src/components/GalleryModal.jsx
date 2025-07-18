import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const GalleryModal = ({ image, title, description, toggleModal }) => {
  const handleBackdropClick = (e) => {
    // Only close if the click is on the backdrop itself, not on the modal content
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContent = (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={handleBackdropClick}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50"
    >
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
          <h2 className="text-xs md:text-lg lg:text-xl font-bold mb-2 text-[var(--color-text)]">
            {title}
          </h2>
          <p className="text-[var(--color-text)] text-xs md:text-sm lg:text-lg">
            {description}
          </p>
          <p className="text-[var(--color-primary)] text-[8px] underline lg:text-xs mt-4">
            Click anywhere to close this modal.
          </p>
        </div>
      </div>
    </motion.div>
  );

  return createPortal(modalContent, document.getElementById("app"));
};

export default GalleryModal;
