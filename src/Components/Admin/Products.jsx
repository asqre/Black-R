import React, { useState, useEffect } from "react";
import { MdSearch, MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { productsData } from "../../data/productsData";
import "./AdminModules.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        strikedPrice: "",
        itemCategory: "",
        discountprice: "",
        imageURLcolor1: "",
        imageURLcolor2: "",
    });

    useEffect(() => {
        setProducts(productsData);
    }, []);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setFormData({
            productName: "",
            price: "",
            strikedPrice: "",
            itemCategory: "",
            discountprice: "",
            imageURLcolor1: "",
            imageURLcolor2: "",
        });
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            productName: product.productName,
            price: product.price,
            strikedPrice: product.strikedPrice,
            itemCategory: product.itemCategory,
            discountprice: product.discountprice,
            imageURLcolor1: product.imageURLcolor1,
            imageURLcolor2: product.imageURLcolor2,
        });
        setShowModal(true);
    };

    const handleSaveProduct = () => {
        if (editingProduct) {
            // Update existing product
            setProducts(products.map(p => 
                p._id === editingProduct._id 
                    ? { ...p, ...formData, price: Number(formData.price), strikedPrice: Number(formData.strikedPrice) }
                    : p
            ));
        } else {
            // Add new product
            const newProduct = {
                _id: `R-${String(products.length + 1).padStart(3, '0')}`,
                ...formData,
                price: Number(formData.price),
                strikedPrice: Number(formData.strikedPrice),
                Rating: 0,
                RatingCount: 0,
            };
            setProducts([...products, newProduct]);
        }
        setShowModal(false);
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p._id !== productId));
        }
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.itemCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-module">
            <div className="module-header">
                <h1>Products Management</h1>
                <p>Manage your product catalog</p>
            </div>

            <div className="module-toolbar">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn-primary" onClick={handleAddProduct}>
                    <MdAdd /> Add Product
                </button>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Striked Price</th>
                            <th>Discount</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.productName}</td>
                                <td>{product.itemCategory}</td>
                                <td>₹{product.price.toLocaleString()}</td>
                                <td>₹{product.strikedPrice.toLocaleString()}</td>
                                <td>{product.discountprice}</td>
                                <td>{product.Rating} ({product.RatingCount})</td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-icon" 
                                            onClick={() => handleEditProduct(product)}
                                            title="Edit"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button 
                                            className="btn-icon danger" 
                                            onClick={() => handleDeleteProduct(product._id)}
                                            title="Delete"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Striked Price</label>
                                <input
                                    type="number"
                                    value={formData.strikedPrice}
                                    onChange={(e) => setFormData({ ...formData, strikedPrice: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={formData.itemCategory}
                                onChange={(e) => setFormData({ ...formData, itemCategory: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                <option value="Adaptors">Adaptors</option>
                                <option value="Cables">Cables</option>
                                <option value="Earbuds TWS">Earbuds TWS</option>
                                <option value="Neck band">Neck band</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Discount</label>
                            <input
                                type="text"
                                value={formData.discountprice}
                                onChange={(e) => setFormData({ ...formData, discountprice: e.target.value })}
                                placeholder="e.g., 35%"
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL 1</label>
                            <input
                                type="text"
                                value={formData.imageURLcolor1}
                                onChange={(e) => setFormData({ ...formData, imageURLcolor1: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL 2</label>
                            <input
                                type="text"
                                value={formData.imageURLcolor2}
                                onChange={(e) => setFormData({ ...formData, imageURLcolor2: e.target.value })}
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-primary" onClick={handleSaveProduct}>
                                {editingProduct ? "Update" : "Add"} Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;

