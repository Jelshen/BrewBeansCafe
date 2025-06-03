import React from "react";

const MENU_IMAGE_URL = `${import.meta.env.VITE_MENU_IMAGE_URL}`;

const MenuCard = React.memo(
  ({ id, image, name, price, description, category }) => {
    return (
      <div>
        <div
          className="relative bg-[var(--color-background)] rounded-xl shadow-lg 
              overflow-hidden w-full h-68 lg:h-88
              transition-transform hover:scale-103 duration-300"
        >
          <img
            src={MENU_IMAGE_URL + image}
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
