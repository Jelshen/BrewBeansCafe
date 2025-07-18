// Import libraries
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// Import API and components
import menuApi from "../api/menu.js";
import categoryApi from "../api/category.js";
import MenuCard from "../components/MenuCard.jsx";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuData, categoryData] = await Promise.all([
          menuApi.getMenu(),
          categoryApi.getCategories(),
        ]);
        setMenuItems(menuData);
        setCategories(categoryData);
      } catch (err) {
        console.log("Error fetching menu or categories:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Create a lookup map for categories to avoid repeated find operations
  const categoryLookup = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.category_id] = category.name;
      return acc;
    }, {});
  }, [categories]);

  // Filter items
  const filteredItems = useMemo(
    () =>
      selectedCategory === "all"
        ? menuItems
        : menuItems.filter((item) => item.category_id === selectedCategory),
    [selectedCategory, menuItems]
  );

  // Memoize the category change handler
  const handleCategoryChange = useMemo(
    () => (e) => {
      const categoryId = parseInt(e.target.value);
      setSelectedCategory(e.target.value === "all" ? "all" : categoryId);
    },
    []
  );

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="text-[var(--color-accent)] backdrop-blur-md min-h-screen">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-wrap lg:flex-row justify-end lg:justify-center px-4 pt-4 md:px-8 md:pt-8 lg:px-10 lg:pt-10 xl:px-20 xl:pt-20">
          <div className="lg:w-1/2 flex flex-col justify-center p-4 lg:p-0">
            <h1 className="text-2xl xl:text-4xl font-bold text-transparent bg-clip-text bg-linear-10 from-[var(--color-accent)] to-[var(--color-background)]">
              Our Menu!
            </h1>
            <p className="text-xs md:text-sm xl:text-lg mt-4 lg:mt-8 text-[var(--color-background)]">
              Discover our delicious offerings, from freshly brewed coffee to
              delectable pastries. Each item is crafted with care to ensure the
              best experience for our customers. Whether you're in the mood for
              a quick snack or a leisurely meal, we have something for everyone.
              Explore our menu and find your new favorite treat!
            </p>
          </div>

          {/* Category Filter */}
          <div className="lg:w-1/2 flex flex-col items-end justify-end mt-4">
            <select
              disabled={!menuItems || menuItems.length === 0}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="text-xs md:text-sm xl:text-lg md:w-64 p-2 rounded-lg border-2 border-[var(--color-accent)] 
            bg-[var(--color-background)] text-[var(--color-text)]
            focus:outline-none focus:border-[var(--color-primary)]"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Menu Grid */}
        {error || !menuItems ? (
          <div
            className="
          pb-20 px-4 pt-4 md:px-8 md:pt-8 lg:px-10 xl:px-20 xl:pt-10
          flex justify-center items-center"
          >
            <p className="mt-8 lg:text-xl text-sm font-medium text-[var(--color-accent)]">
              No menu items available.
            </p>
          </div>
        ) : (
          <div
            className="pb-20 px-4 pt-4 md:px-8 md:pt-8 lg:px-10 xl:px-20 xl:pt-10 
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredItems.map((item) => (
              <MenuCard
                key={item.menu_id}
                id={item.menu_id}
                name={item.menu_name}
                price={item.menu_price}
                description={item.menu_description}
                category={categoryLookup[item.category_id] || "Uncategorized"}
                noScale={false}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Menu;
