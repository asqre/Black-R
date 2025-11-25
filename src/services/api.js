// Black-R API Service
const API_BASE_URL = "https://blackr-backend.vercel.app/api/v4";

// API Response transformer - converts API format to app format
const transformProduct = (product) => {
  return {
    _id: product._id || product.tokenId,
    productName: product.name,
    price: product.price,
    strikedPrice: product.strikedPrice || Math.round(product.price * 1.3), // Calculate if not provided
    Rating: product.rating || 4.5,
    RatingCount: product.ratingCount || 0,
    itemCategory: product.category,
    discountprice:
      product.discount ||
      calculateDiscount(product.price, product.strikedPrice),
    imageURLcolor1: product.productImage,
    imageURLcolor2: product.productImageGallery?.[0] || product.productImage,
    imageGallery: product.productImageGallery || [],
    description: product.description,
    color: product.color,
    display: product.display,
    tokenId: product.tokenId,
  };
};

// Calculate discount percentage
const calculateDiscount = (price, strikedPrice) => {
  if (!strikedPrice || strikedPrice <= price) return "0%";
  const discount = Math.round(((strikedPrice - price) / strikedPrice) * 100);
  return `${discount}%`;
};

// Transform app format to API format for creating/updating products
const transformToApiFormat = (product) => {
  return {
    name: product.productName || product.name,
    category: product.itemCategory || product.category,
    description: product.description || "",
    price: Number(product.price),
    color: product.color || "black",
    display: product.display !== false,
    tokenId: product.tokenId || product._id,
    productImage: product.imageURLcolor1 || product.productImage,
    productImageGallery:
      product.imageGallery ||
      [product.imageURLcolor2 || product.productImage].filter(Boolean),
  };
};

// GET all products
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Handle different API response structures
    const products = data.products || data.data || data;

    if (Array.isArray(products)) {
      return products.map(transformProduct);
    }
    return [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// GET products by category
export const fetchProductsByCategory = async (category) => {
  try {
    // Map frontend category names to API category names
    const categoryMap = {
      adaptors: "Adaptor",
      cables: "Cables",
      earbuds_tws: "Earbuds TWS",
      neck_band: "Neck band",
      Adaptors: "Adaptor",
      Cables: "Cables",
      "Earbuds TWS": "Earbuds TWS",
      "Neck band": "Neck band",
    };

    const apiCategory = categoryMap[category] || category;
    const response = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(apiCategory)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle different API response structures
    const products = data.products || data.data || data;

    if (Array.isArray(products)) {
      return products.map(transformProduct);
    }
    return [];
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// GET single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const product = data.product || data.data || data;

    return transformProduct(product);
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

// POST create new product (Admin)
export const createProduct = async (productData) => {
  try {
    const apiData = transformToApiFormat(productData);

    const response = await fetch(`${API_BASE_URL}/admin/product/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    const product = data.product || data.data || data;

    return transformProduct(product);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// PUT update product (Admin)
export const updateProduct = async (productId, productData) => {
  try {
    const apiData = transformToApiFormat(productData);

    const response = await fetch(`${API_BASE_URL}/admin/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    const product = data.product || data.data || data;

    return transformProduct(product);
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    throw error;
  }
};

// DELETE product (Admin)
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error;
  }
};

// GET all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      // Return default categories if API doesn't have this endpoint
      return [
        { id: 1, name: "Adaptor", slug: "adaptors" },
        { id: 2, name: "Cables", slug: "cables" },
        { id: 3, name: "Earbuds TWS", slug: "earbuds_tws" },
        { id: 4, name: "Neck band", slug: "neck_band" },
      ];
    }

    const data = await response.json();
    return data.categories || data.data || data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return default categories on error
    return [
      { id: 1, name: "Adaptor", slug: "adaptors" },
      { id: 2, name: "Cables", slug: "cables" },
      { id: 3, name: "Earbuds TWS", slug: "earbuds_tws" },
      { id: 4, name: "Neck band", slug: "neck_band" },
    ];
  }
};

export default {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
};
