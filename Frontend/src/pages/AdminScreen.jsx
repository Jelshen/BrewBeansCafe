import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import background from "../assets/background/background.jpg";

// API
import menuApi from "../api/menu.js";
import authenticate from "../api/authenticate.js";
import categoryApi from "../api/category.js";

// Components
import UpsertMenuModal from "../components/Admin/UpsertMenuModal.jsx";
import AdminMenuSection from "../components/Admin/AdminMenuSection.jsx";
import AdminCategorySection from "../components/Admin/AdminCategorySection.jsx";
import AdminSidebar from "../components/Admin/AdminSidebar.jsx";
import Swal from "sweetalert2";

const AdminScreen = ({ username }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageRefreshVersion, setImageRefreshVersion] = useState(0);

  // Modal Purposes
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // State management
  const [isMenu, setIsMenu] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Confirm dialog (e.g. for logout or delete)
  const showConfirm = async ({ title, text, confirmButtonText }) => {
    return await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      customClass: {
        popup: "text-white",
      },
    });
  };

  // Loading dialog
  const showLoading = (title = "Loading...") => {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  // Success alert
  const showSuccess = async (title, text, timer = 2000) => {
    await Swal.fire({
      icon: "success",
      title,
      text,
      timer,
      showConfirmButton: true,
    });
  };

  // Error alert
  const showError = async (error) => {
    await Swal.fire({
      icon: "error",
      title: "Error!",
      text: error?.message || "Something went wrong.",
    });
  };

  const handleLogout = async () => {
    const result = await showConfirm({
      title: "Are you sure?",
      text: "This will log you out.",
      confirmButtonText: "Logout",
    });

    if (!result.isConfirmed) return;

    showLoading("Logging out...");

    try {
      await authenticate.logout();
      await showSuccess(
        "Logged out!",
        "You have been logged out successfully."
      );
      window.location.href = "/admin";
    } catch (err) {
      await showError(err);
    }
  };

  // Move fetchData here so it's reusable
  const fetchData = async () => {
    try {
      const [menuData, categoryData] = await Promise.all([
        menuApi.getMenu(),
        categoryApi.getCategories(),
      ]);
      setMenuItems(Array.isArray(menuData) ? menuData : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);

      // Trigger image refresh
      setImageRefreshVersion((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
      console.log("Error fetching data:", err);
    }
  };

  // Menu Section
  const handleSave = async (data) => {
    showLoading("Saving...");

    try {
      const response = await menuApi.upsertMenu(data);
      if (!response) return;

      await showSuccess("Saved!", "Menu item saved successfully.");
      fetchData();
    } catch (err) {
      await showError(err);
    }
  };

  const EditMenu = (item) => {
    setSelectedItem(item);
    setShowMenuModal(true);
  };

  const CreateMenu = () => {
    setSelectedItem(null); // create mode
    setShowMenuModal(true);
  };

  const deleteMenu = async (id) => {
    const result = await showConfirm({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const success = await menuApi.deleteMenu(id);
      if (!success) return;

      await showSuccess("Deleted!", "Menu item has been deleted.");
      fetchData();
    } catch (err) {
      await showError(err);
    }
  };

  // Category Section
  const addCategory = async (category) => {
    showLoading("Saving...");

    try {
      const response = await categoryApi.addCategory(category);
      if (response) {
        await showSuccess("Saved!", "Category saved successfully.");
        fetchData();
      }
    } catch (err) {
      await showError(err);
    }
  };

  const deleteCategory = async (id) => {
    const result = await showConfirm({
      title: "Are you sure?",
      text: "This will delete the category.",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    showLoading("Deleting...");

    try {
      const response = await categoryApi.deleteCategory(id);
      if (response) {
        await showSuccess("Deleted!", "Category deleted.");
        fetchData();
      }
    } catch (err) {
      await showError(err);
    }
  };

  const categoryLookup = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.category_id] = category.name;
      return acc;
    }, {});
  }, [categories]);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat
      font-display flex flex-row h-screen backdrop-blur-xl"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-black/20 -z-10"></div>
      <AdminSidebar
        isMenu={isMenu}
        setIsMenu={setIsMenu}
        handleLogout={handleLogout}
      />
      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold text-[var(--color-accent)] mb-4">
            Welcome, {username}!
          </h1>
          {isMenu && (
            <button
              onClick={CreateMenu}
              className="z-30 absolute bottom-8 right-8 w-12 h-12 rounded-full bg-[var(--color-accent)] text-white 
                       flex items-center justify-center shadow-md hover:bg-[var(--color-primary)] hover:scale-110
                       transition duration-200 hover:cursor-pointer"
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
          )}
        </div>

        {isMenu ? (
          // Render if menu button is clicked, which will set isMenu to true.
          menuItems.length === 0 ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-[var(--color-accent)] text-lg lg:text-3xl font-medium">
                There aren't any menus.
              </p>
            </div>
          ) : (
            <AdminMenuSection
              menuItems={menuItems}
              categoryLookup={categoryLookup}
              Edit={EditMenu}
              deleteMenu={deleteMenu}
              imageRefreshVersion={imageRefreshVersion}
            />
          )
        ) : (
          <AdminCategorySection
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        )}
      </main>

      {showMenuModal && (
        <UpsertMenuModal
          isOpen={showMenuModal}
          item={selectedItem}
          categories={categories}
          onClose={() => setShowMenuModal(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default AdminScreen;
