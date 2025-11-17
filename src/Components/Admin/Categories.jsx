import React, { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete, MdSearch } from "react-icons/md";
import "./AdminModules.css";

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Adaptors", description: "Power adaptors and chargers", productCount: 2 },
        { id: 2, name: "Cables", description: "USB and charging cables", productCount: 2 },
        { id: 3, name: "Earbuds TWS", description: "True wireless earbuds", productCount: 2 },
        { id: 4, name: "Neck band", description: "Neckband headphones", productCount: 1 },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleAddCategory = () => {
        setEditingCategory(null);
        setFormData({ name: "", description: "" });
        setShowModal(true);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description,
        });
        setShowModal(true);
    };

    const handleSaveCategory = () => {
        if (editingCategory) {
            setCategories(categories.map(c =>
                c.id === editingCategory.id
                    ? { ...c, ...formData }
                    : c
            ));
        } else {
            const newCategory = {
                id: categories.length + 1,
                ...formData,
                productCount: 0,
            };
            setCategories([...categories, newCategory]);
        }
        setShowModal(false);
    };

    const handleDeleteCategory = (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category? Products in this category will be affected.")) {
            setCategories(categories.filter(c => c.id !== categoryId));
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-module">
            <div className="module-header">
                <h1>Categories Management</h1>
                <p>Organize your products into categories</p>
            </div>

            <div className="module-toolbar">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn-primary" onClick={handleAddCategory}>
                    <MdAdd /> Add Category
                </button>
            </div>

            <div className="categories-grid">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="category-card">
                        <div className="category-header">
                            <h3>{category.name}</h3>
                            <div className="action-buttons">
                                <button
                                    className="btn-icon"
                                    onClick={() => handleEditCategory(category)}
                                    title="Edit"
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="btn-icon danger"
                                    onClick={() => handleDeleteCategory(category.id)}
                                    title="Delete"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        <p className="category-description">{category.description}</p>
                        <div className="category-footer">
                            <span className="product-count">{category.productCount} Products</span>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Headphones"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Category description..."
                                rows="4"
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-primary" onClick={handleSaveCategory}>
                                {editingCategory ? "Update" : "Add"} Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;

