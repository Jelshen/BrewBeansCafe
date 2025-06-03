import React, { useState } from "react";

const ImageCard = ({ image, toggleModal }) => {
  return (
    <>
      <button
        className="mb-4 inline-block w-full rounded-2xl overflow-hidden shadow-md 
          bg-[var(--color-background)] cursor-pointer transition-transform 
          hover:scale-104 duration-300 "
        onClick={toggleModal}
      >
        <img
          className="w-full object-cover rounded-lg"
          src={image}
          alt="Placeholder"
        />
      </button>
    </>
  );
};

export default ImageCard;
