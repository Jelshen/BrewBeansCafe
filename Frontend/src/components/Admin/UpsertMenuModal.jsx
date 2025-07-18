import React, { useEffect, useState } from "react";

const UpsertMenuModal = ({
  isOpen,
  onClose,
  item = null,
  categories,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    menuImage: null,
  });

  const [fileError, setFileError] = useState("");

  const [formErrors, setFormErrors] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    if (item) {
      setForm((prev) => ({
        ...prev,
        name: item.menu_name || "",
        price: item.menu_price || "",
        description: item.menu_description || "",
        categoryId: item.category_id || "",
      }));
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        menuImage: null,
      });
    }
    setFileError("");
  }, [item]);

  if (!isOpen) return null;

  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) {
      errors.price = "Price must be a positive number.";
    }

    if (!form.description.trim()) {
      errors.description = "Description is required.";
    }

    if (!form.categoryId) {
      errors.categoryId = "Please select a category.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFileError("Image size must be less than 10MB.");
        setForm((prev) => ({ ...prev, menuImage: null }));
      } else {
        setFileError("");
        setForm((prev) => ({ ...prev, menuImage: file }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      ...item, // include menu_id if updating
      menu_name: form.name,
      menu_price: parseFloat(form.price),
      menu_description: form.description,
      category_id: form.categoryId,
      menu_image: form.menuImage, // you can access this on the backend
    };

    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 lg:p-6 rounded-lg w-[80%] max-w-lg shadow-lg"
      >
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-[var(--color-text)]">
          {item ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-xs md:text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded text-xs md:text-sm"
          />
          {formErrors.name && (
            <p className="text-xs lg:text-sm text-red-600 mt-1">
              {formErrors.name}
            </p>
          )}
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-xs md:text-sm">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded text-xs md:text-sm"
          />
          {formErrors.price && (
            <p className="text-xs lg:text-sm text-red-600 mt-1">
              {formErrors.price}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-xs md:text-sm">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded text-xs md:text-sm"
          />
          {formErrors.description && (
            <p className="text-xs lg:text-sm text-red-600 mt-1">
              {formErrors.description}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-xs md:text-sm">
            Upload Image
          </label>
          <input
            name="menuImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 text-sm text-gray-600
             bg-white border rounded
              file:cursor-pointer transition-colors file:mr-3 
              file:py-2 file:px-4 file:rounded-md file:border-0 
              file:text-sm file:font-medium file:bg-[var(--color-primary)]
            file:text-[var(--color-background)] hover:file:bg-[var(--color-accent)]"
          />
          {form.menuImage && (
            <p className="text-sm text-[var(--color-text)] mt-1">
              Selected: {form.menuImage.name}
            </p>
          )}
          {fileError && (
            <p className="text-xs lg:text-sm text-red-600 mt-1">{fileError}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-xs md:text-sm">
            Category
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border p-2 rounded text-xs md:text-sm"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formErrors.categoryId && (
            <p className="text-sm text-red-600 mt-1">{formErrors.categoryId}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs lg:text-sm px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={fileError !== ""}
            className="text-xs lg:text-sm px-4 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-primary)]"
          >
            {item ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpsertMenuModal;
