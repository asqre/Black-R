import React, { useState, useEffect } from "react";
import { MdSearch, MdAdd, MdEdit, MdDelete, MdRefresh } from "react-icons/md";
import { 
    fetchAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../../services/api";
import "./AdminModules.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        strikedPrice: "",
        itemCategory: "",
        description: "",
        color: "",
        tokenId: "",
        imageURLcolor1: "",
        imageURLcolor2: "",
        imageGallery: [],
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedProducts = await fetchAllProducts();
            setProducts(fetchedProducts);
        } catch (err) {
            console.error("Failed to load products:", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setFormData({
            productName: "",
            price: "",
            strikedPrice: "",
            itemCategory: "",
            description: "",
            color: "",
            tokenId: "",
            imageURLcolor1: "",
            imageURLcolor2: "",
            imageGallery: [],
        });
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            productName: product.productName,
            price: product.price,
            strikedPrice: product.strikedPrice || "",
            itemCategory: product.itemCategory,
            description: product.description || "",
            color: product.color || "",
            tokenId: product.tokenId || product._id,
            imageURLcolor1: product.imageURLcolor1 || "",
            imageURLcolor2: product.imageURLcolor2 || "",
            imageGallery: product.imageGallery || [],
        });
        setShowModal(true);
    };

    const handleSaveProduct = async () => {
        setSaving(true);
        setError(null);

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                strikedPrice: formData.strikedPrice ? Number(formData.strikedPrice) : null,
            };

            if (editingProduct) {
                // Update existing product
                const updatedProduct = await updateProduct(editingProduct._id, productData);
                setProducts(products.map(p =>
                    p._id === editingProduct._id ? updatedProduct : p
                ));
            } else {
                // Create new product
                const newProduct = await createProduct(productData);
                setProducts([...products, newProduct]);
            }
            setShowModal(false);
        } catch (err) {
            console.error("Failed to save product:", err);
            setError(err.message || "Failed to save product. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(productId);
                setProducts(products.filter(p => p._id !== productId));
            } catch (err) {
                console.error("Failed to delete product:", err);
                setError("Failed to delete product. Please try again.");
            }
        }
    };

    const handleGalleryChange = (index, value) => {
        const newGallery = [...formData.imageGallery];
        newGallery[index] = value;
        setFormData({ ...formData, imageGallery: newGallery });
    };

    const addGalleryImage = () => {
        setFormData({ 
            ...formData, 
            imageGallery: [...formData.imageGallery, ""] 
        });
    };

    const removeGalleryImage = (index) => {
        const newGallery = formData.imageGallery.filter((_, i) => i !== index);
        setFormData({ ...formData, imageGallery: newGallery });
    };

    const filteredProducts = products.filter(product =>
        (product.productName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (product.itemCategory?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-module">
                <div className="module-header">
                    <h1>Products Management</h1>
                    <p>Manage your product catalog</p>
                </div>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-module">
            <div className="module-header">
                <h1>Products Management</h1>
                <p>Manage your product catalog</p>
            </div>

            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}

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
                <div className="toolbar-buttons">
                    <button className="btn-secondary" onClick={loadProducts} title="Refresh">
                        <MdRefresh /> Refresh
                    </button>
                    <button className="btn-primary" onClick={handleAddProduct}>
                        <MdAdd /> Add Product
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Token ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Striked Price</th>
                            <th>Color</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="no-data">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.tokenId || product._id}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.itemCategory}</td>
                                    <td>₹{product.price?.toLocaleString()}</td>
                                    <td>{product.strikedPrice ? `₹${product.strikedPrice.toLocaleString()}` : '-'}</td>
                                    <td>{product.color || '-'}</td>
                                    <td>{product.Rating || 0} ({product.RatingCount || 0})</td>
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => !saving && setShowModal(false)}>
                    <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    placeholder="Enter product name"
                                    disabled={saving}
                                />
                            </div>
                            <div className="form-group">
                                <label>Token ID *</label>
                                <input
                                    type="text"
                                    value={formData.tokenId}
                                    onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
                                    placeholder="e.g., A06"
                                    disabled={saving}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price *</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="Enter price"
                                    disabled={saving}
                                />
                            </div>
                            <div className="form-group">
                                <label>Striked Price (Original)</label>
                                <input
                                    type="number"
                                    value={formData.strikedPrice}
                                    onChange={(e) => setFormData({ ...formData, strikedPrice: e.target.value })}
                                    placeholder="Original price (optional)"
                                    disabled={saving}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={formData.itemCategory}
                                    onChange={(e) => setFormData({ ...formData, itemCategory: e.target.value })}
                                    disabled={saving}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Adaptor">Adaptor</option>
                                    <option value="Cables">Cables</option>
                                    <option value="Earbuds TWS">Earbuds TWS</option>
                                    <option value="Neck band">Neck band</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Color</label>
                                <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    placeholder="e.g., white, black"
                                    disabled={saving}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Product description..."
                                rows="3"
                                disabled={saving}
                            />
                        </div>

                        <div className="form-group">
                            <label>Main Product Image URL *</label>
                            <input
                                type="text"
                                value={formData.imageURLcolor1}
                                onChange={(e) => setFormData({ ...formData, imageURLcolor1: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                disabled={saving}
                            />
                            {formData.imageURLcolor1 && (
                                <div className="image-preview">
                                    <img src={formData.imageURLcolor1} alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Gallery Images</label>
                            {formData.imageGallery.map((url, index) => (
                                <div key={index} className="gallery-input">
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                                        placeholder={`Gallery image ${index + 1} URL`}
                                        disabled={saving}
                                    />
                                    <button 
                                        type="button" 
                                        className="btn-icon danger"
                                        onClick={() => removeGalleryImage(index)}
                                        disabled={saving}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button" 
                                className="btn-secondary btn-small"
                                onClick={addGalleryImage}
                                disabled={saving}
                            >
                                <MdAdd /> Add Gallery Image
                            </button>
                        </div>

                        <div className="modal-actions">
                            <button 
                                className="btn-secondary" 
                                onClick={() => setShowModal(false)}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={handleSaveProduct}
                                disabled={saving || !formData.productName || !formData.price || !formData.itemCategory || !formData.imageURLcolor1}
                            >
                                {saving ? (
                                    <>
                                        <span className="btn-spinner"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>{editingProduct ? "Update" : "Add"} Product</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
