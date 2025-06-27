import React from "react";
import { useState, useEffect } from "react";

import menu from "../api/menu.js";

const HomeCard = ({ id, name, description }) => {
  const [image_url, setImageUrl] = useState("");

  useEffect(() => {
    const fetchMenuImage = async () => {
      try {
        const imageUrl = await menu.getMenuImage(id);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching menu image:", error);
      }
    };

    fetchMenuImage();
  }, []);

  return (
    <div
      className="mx-auto max-w-xl w-full h-full border 
        rounded-2xl overflow-hidden shadow-md flex flex-col
         bg-[var(--color-background)]"
    >
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={image_url}
        alt="Card image"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-[var(--color-primary)] text-sm lg:text-md font-bold mb-2">
          {name}
        </h2>

        <p
          className="text-[var(--color-text)] 
            text-xs lg:text-xs flex-grow"
        >
          {description}
        </p>

        <a
          href="/menu"
          className="text-xs active:text-[var(--color-primary)] mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary)]"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HomeCard;
