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
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: item.menu_name || "",
        price: item.menu_price || "",
        description: item.menu_description || "",
        image: item.picture_url || "",
        categoryId: item.category_id || "",
      });
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        categoryId: "",
      });
    }
  }, [item]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...item, // include menu_id if updating
      menu_name: form.name,
      menu_price: parseFloat(form.price),
      menu_description: form.description,
      picture_url: form.image,
      category_id: form.categoryId,
    };
    onSubmit(data); // parent handles insert or update logic
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
          {item ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>

        {/* Inputs */}
        {[
          { label: "Name", name: "name" },
          { label: "Price", name: "price", type: "float" },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Image URL/Filename", name: "image" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 font-medium text-sm">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            )}
          </div>
        ))}

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-primary)]"
          >
            {item ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpsertMenuModal;
