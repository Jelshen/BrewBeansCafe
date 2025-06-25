import React from "react";

import { useState, useEffect, useMemo } from "react";

import fetchMenu from "../api/FetchMenu.js";
import fetchCategory from "../api/fetchCategory.js";
import MenuCard from "../components/MenuCard.jsx";
import UpsertMenuModal from "../components/UpsertMenuModal.jsx";

const AdminScreen = ({ username }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal Purposes
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const Edit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const Create = () => {
    setSelectedItem(null); // create mode
    setShowModal(true);
  };

  const handleSave = async (data) => {
    if (data.menu_id) {
      // update logic
    } else {
      // insert logic
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [menuData, categoryData] = await Promise.all([
          fetchMenu.getMenu(),
          fetchCategory.getCategories(),
        ]);
        setMenuItems(menuData);
        setCategories(categoryData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryLookup = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.category_id] = category.name;
      return acc;
    }, {});
  }, [categories]);

  return (
    <div className="flex flex-row h-screen bg-[var(--color-background)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-accent)] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">BrewBeans Cafe</div>
        <nav className="flex-1 px-4 space-y-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white hover:text-[var(--color-accent)] transition">
            Menu
          </button>
        </nav>
        <div className="p-4 flex items-center justify-center">
          <button className="items-center gap-2 w-[50%] px-3 py-2 bg-[var(--color-primary)] text-[var(--color-accent)] font-bold rounded hover:bg-[var(--color-background)] transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {username}!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.menu_id} className="relative">
              <MenuCard
                image={item.picture_url}
                name={item.menu_name}
                price={item.menu_price}
                description={item.menu_description}
                category={categoryLookup[item.category_id] || "Uncategorized"}
                noScale={true}
              />
              <div className="flex flex-row absolute bottom-4 right-4 gap-3">
                <button
                  onClick={() => Edit(item)}
                  className="bg-[var(--color-accent)]
                 text-white p-1 w-15 rounded-full shadow
                 hover:bg-[var(--color-primary)]"
                  aria-label="Edit menu"
                >
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 center"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3zM4 20h16"
                      />
                    </svg>
                    <span className="text-xs px-1">Edit</span>
                  </div>
                </button>

                <button
                  className="bottom-4 bg-[var(--color-accent)]
                 text-white p-1 w-20 rounded-full shadow
                 hover:bg-[red]"
                  aria-label="Delete menu"
                >
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 center"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7L5 7M10 11V17M14 11V17M6 7L6 19A2 2 0 008 21H16A2 2 0 0018 19V7M9 7V5A1 1 0 0110 4H14A1 1 0 0115 5V7"
                      />
                    </svg>
                    <span className="text-xs px-1">Delete</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <UpsertMenuModal
          isOpen={showModal}
          item={selectedItem}
          categories={categories}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default AdminScreen;
