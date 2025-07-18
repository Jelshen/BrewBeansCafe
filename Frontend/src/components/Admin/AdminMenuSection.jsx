import React from "react";
import MenuCard from "../MenuCard.jsx";
import { motion } from "framer-motion";

const AdminMenuSection = ({
  menuItems,
  categoryLookup,
  Edit,
  deleteMenu,
  imageRefreshVersion,
}) => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {menuItems.map((item) => (
        <div key={item.menu_id} className="relative">
          <MenuCard
            id={item.menu_id}
            name={item.menu_name}
            price={item.menu_price}
            description={item.menu_description}
            category={categoryLookup[item.category_id] || "Uncategorized"}
            noScale={true}
            refreshKey={imageRefreshVersion}
          />
          <div className="flex flex-row rounded-xl p-1 bg-[var(--color-primary)] absolute top-4 right-4 gap-1">
            <button
              onClick={() => Edit(item)}
              className=" text-[var(--color-background)]
               hover:text-[var(--color-accent)] hover:cursor-pointer"
              aria-label="Edit menu"
            >
              <div className="flex flex-row justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 md:h-7 center"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={() => deleteMenu(item.menu_id)}
              className="text-[var(--color-background)] hover:text-red-600
              hover:cursor-pointer"
              aria-label="Delete menu"
            >
              <div className="flex flex-row justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 center"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default AdminMenuSection;
