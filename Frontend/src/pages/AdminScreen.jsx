import React from "react";

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import menu from "../api/menu.js";
import fetchCategory from "../api/fetchCategory.js";
import MenuCard from "../components/MenuCard.jsx";
import UpsertMenuModal from "../components/UpsertMenuModal.jsx";
import Swal from "sweetalert2";

const AdminScreen = ({ username }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageRefreshVersion, setImageRefreshVersion] = useState(0);

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

  useEffect(() => {
    fetchData();
  }, []);

  const deleteMenu = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await menu.deleteMenu(id); // Call your API
        // Show success alert after successful deletion
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Menu item has been deleted.",
          showConfirmButton: true,
        });

        fetchData(); // Refresh the list afterward
      } catch (err) {
        // Show error alert
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.message || "Failed to delete menu item.",
        });
      }
    }
  };

  // Move fetchData here so it's reusable
  const fetchData = async () => {
    try {
      setLoading(true);
      const [menuData, categoryData] = await Promise.all([
        menu.getMenu(),
        fetchCategory.getCategories(),
      ]);
      setMenuItems(Array.isArray(menuData) ? menuData : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);

      // Trigger image refresh
      setImageRefreshVersion((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
      console.log("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await menu.upsertMenu(data);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Menu item saved successfully.",
          timer: 2000,
          showConfirmButton: true,
        }).then(() => {
          fetchData(); // ✅ You can now call this here
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
      });
    }
  };

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
          <Link to="/home">
            <button className="items-center gap-2 w-[50%] px-3 py-2 bg-[var(--color-primary)] text-[var(--color-accent)] font-bold rounded hover:bg-[var(--color-background)] transition">
              Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome, {username}!
          </h1>
          <button
            onClick={Create}
            className="bg-[var(--color-accent)] text-white px-4 py-2 rounded
             hover:bg-[var(--color-primary)] transition mb-4"
            aria-label="Add new menu item"
          >
            Add Menu
          </button>
        </div>

        {menuItems.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <p className="text-[var(--color-accent)] text-3xl font-medium">
              There aren't any menus.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.menu_id} className="relative">
                <MenuCard
                  id={item.menu_id}
                  name={item.menu_name}
                  price={item.menu_price}
                  description={item.menu_description}
                  category={categoryLookup[item.category_id] || "Uncategorized"}
                  noScale={true}
                  refreshKey={imageRefreshVersion} // Use the refresh version to force image reload
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
                    onClick={() => deleteMenu(item.menu_id)}
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
        )}
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
