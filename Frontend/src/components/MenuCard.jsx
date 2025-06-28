import React from "react";
import { use } from "react";
import { memo, useState, useEffect } from "react";

import menu from "../api/menu.js";

const MenuCard = memo(
  ({ id, name, price, description, category, noScale = false, refreshKey }) => {
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
    }, [refreshKey]);

    return (
      <div>
        <div
          className={`relative bg-[var(--color-background)] rounded-xl shadow-lg 
              overflow-hidden w-full h-68 lg:h-88
              transition-transform duration-300
              ${noScale ? "" : "hover:scale-103"}`}
        >
          <img
            src={image_url}
            alt={name}
            className="w-full h-28 lg:h-48 object-cover"
            loading="lazy" // Lazy load images
            decoding="async" // Async decoding
          />
          <div className="p-4">
            <div className="flex lg:flex-row justify-between items-start mb-2 md:mb-4">
              <h3 className="text-[14px] md:text-[16px] lg:text-[20px] font-bold text-[var(--color-primary)]">
                {name}
              </h3>
              <span className="text-[14px] md:text-[16px] lg:text-[20px] font-semibold text-[var(--color-accent)]">
                ${price.toFixed(2)}
              </span>
            </div>
            <p className="text-[12px] md:text-[16px] text-[var(--color-text)]">
              {description}
            </p>
          </div>
          <div className="absolute bottom-4 left-4">
            <span
              className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)] 
              text-[var(--color-background)] text-[12px] md:text-xs"
            >
              {category}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

// Set display name for debugging purposes
MenuCard.displayName = "MenuCard";

export default MenuCard;
