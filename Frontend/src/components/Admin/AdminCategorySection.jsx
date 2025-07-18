import React, { useState } from "react";
import { motion } from "framer-motion";

const AdminCategorySection = ({
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [addMode, setAddMode] = useState(false);
  const [addName, setAddName] = useState("");

  const handleAdd = () => {
    if (!addName.trim()) return;
    onAddCategory({ name: addName.trim() });
    setAddName("");
    setAddMode(false);
  };

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
      className="w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-[var(--color-accent)]">
          Available Categories
        </h1>
        <button
          onClick={() => setAddMode(true)}
          disabled={addMode}
          className="top-8 right-8 w-10 h-10 rounded-full
          bg-[var(--color-accent)] text-white flex items-center justify-center
          shadow-md hover:bg-[var(--color-primary)] hover:scale-110 transition
          duration-200 active:scale-105"
          aria-label="Add new menu item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <table className="min-w-full bg-[var(--color-background)] rounded-lg overflow-hidden">
        <thead className="text-xs md:text-lg bg-[var(--color-accent)] text-[var(--color-background)] font-medium">
          <tr>
            <th className="text-left px-4 py-2">No</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {addMode && (
            <tr className="bg-white text-xs md:text-[20px]">
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">
                <input
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full border-2 border-[var(--color-accent)] 
                          rounded-lg px-2 py-1 text-[var(--color-text)]
                          focus:outline-none focus:border-[var(--color-primary)]"
                  placeholder="Enter category name"
                />
              </td>
              <td className="px-4 py-2 flex justify-center items-center gap-2">
                <button
                  onClick={handleAdd}
                  className="bg-green-500 text-white p-2 rounded-2xl hover:bg-green-600 
                  active:scale-105 text-sm flex items-center hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setAddMode(false);
                    setAddName("");
                  }}
                  className="bg-gray-400 text-white p-2 rounded-2xl hover:scale-105
                   hover:bg-gray-500 active:scale-105 text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          )}

          {categories.map((category, index) => (
            <tr
              key={category.category_id}
              className={`${
                index % 2 ? "bg-white" : "bg-[var(--color-background)]"
              } transition font-medium text-[var(--color-text)] text-xs md:text-lg`}
            >
              <td className="px-4 py-2 text-left">{index + 1}</td>
              <td className="px-4 py-2 text-left">{category.name}</td>
              <td className="px-4 py-2 flex gap-2 justify-center items-center">
                <>
                  <button
                    onClick={() => onDeleteCategory(category.category_id)}
                    className="p-1 rounded transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 fill-[var(--color-accent)] hover:fill-red-500 transition-colors duration-200"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h5a1 1 0 1 1 0 2h-1v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5H3a1 1 0 1 1 0-2h5Zm2 4a1 1 0 1 0-2 0v10a1 1 0 0 0 2 0V7Zm4 0a1 1 0 0 0-2 0v10a1 1 0 0 0 2 0V7Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AdminCategorySection;
