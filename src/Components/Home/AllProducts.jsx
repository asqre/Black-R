import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts, fetchProductsByCategory } from "../../services/api";

const AllProducts = ({ handleDispatch }) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [imageErrors, setImageErrors] = useState({});
   const [activeCategory, setActiveCategory] = useState("all");
   const navigate = useNavigate();

   const categories = [
      { id: "all", name: "All Products" },
      { id: "Adaptor", name: "Adaptors" },
      { id: "Cables", name: "Cables" },
      { id: "Earbuds TWS", name: "Earbuds" },
      { id: "Neck band", name: "Neckbands" },
   ];

   useEffect(() => {
      loadProducts();
   }, [activeCategory]);

   const loadProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
         let products;
         if (activeCategory === "all") {
            products = await fetchAllProducts();
         } else {
            products = await fetchProductsByCategory(activeCategory);
         }
         setData(products);
      } catch (err) {
         console.error("Failed to load products:", err);
         setError("Failed to load products. Please try again.");
         setData([]);
      } finally {
         setLoading(false);
      }
   };

   const handleImageError = (productId) => {
      setImageErrors(prev => ({ ...prev, [productId]: true }));
   };

   const handleCategoryClick = (categoryId) => {
      setActiveCategory(categoryId);
   };

   if (loading) {
      return (
         <div className="topSellersDiv">
            <h1 className="headingText">Our Products</h1>
            <div className="loading-container">
               <div className="loading-spinner"></div>
               <p>Loading products...</p>
            </div>
         </div>
      );
   }

   return (
      <div className="topSellersDiv">
         <h1 className="headingText">Our Products</h1>
         
         {/* Category Tabs */}
         <div className="textDiv flex">
            {categories.map((cat) => (
               <p
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={activeCategory === cat.id ? "red" : "simple"}
               >
                  {cat.name}
               </p>
            ))}
         </div>

         {error && (
            <div className="error-message">
               <p>{error}</p>
               <button onClick={loadProducts} className="retry-btn">
                  Retry
               </button>
            </div>
         )}

         {!error && data.length === 0 && (
            <div className="no-products">
               <p>No products found in this category.</p>
            </div>
         )}

         <div className="cardsDiv flex">
            {data.map((e) => {
               return (
                  <div key={e._id} className="card">
                     <div 
                        className="imageDiv"
                        onClick={() => navigate(`/product/${e._id}`)}
                        style={{ cursor: 'pointer' }}
                     >
                        {imageErrors[e._id] || !e.imageURLcolor1 ? (
                           <div className="imagePlaceholder">
                              <span>No Image</span>
                           </div>
                        ) : (
                           <img 
                              src={e.imageURLcolor1} 
                              alt={e.productName}
                              onError={() => handleImageError(e._id)}
                           />
                        )}
                     </div>
                     <div className="dataDiv">
                        <p className="reviewsDiv">
                           <AiFillStar />
                           {e.Rating} ({e.RatingCount} reviews)
                        </p>
                        <p 
                           className="title"
                           onClick={() => navigate(`/product/${e._id}`)}
                           style={{ cursor: 'pointer' }}
                        >
                           {e.productName}
                        </p>
                        <div className="priceDiv flex">
                           <div className="flex">
                              <p className="price">₹ {e.price}</p>
                              {e.strikedPrice && (
                                 <p className="strPrice">₹ {e.strikedPrice}</p>
                              )}
                           </div>
                           <button
                              onClick={() => handleDispatch(e)}
                              className="cardBtn"
                           >
                              <span className="btnText">ADD +</span>
                              <AiOutlineShoppingCart className="btnIcon" size={18} />
                           </button>
                        </div>
                        <ul className="list">
                           <li>Premium quality product</li>
                           <li>Fast delivery available</li>
                           <li>Easy returns & warranty</li>
                        </ul>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default AllProducts;
