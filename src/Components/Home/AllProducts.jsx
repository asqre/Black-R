import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getAllProducts } from "../../data/productsData";
import { useNavigate } from "react-router-dom";

const AllProducts = ({ handleDispatch }) => {
   const [data, setData] = useState([]);
   const [imageErrors, setImageErrors] = useState({});
   const navigate = useNavigate();

   useEffect(() => {
      // Get all products
      const allProducts = getAllProducts();
      setData(allProducts);
   }, []);

   const handleImageError = (productId) => {
      setImageErrors(prev => ({ ...prev, [productId]: true }));
   };

   return (
      <div className="topSellersDiv">
         <h1 className="headingText">Our Products</h1>
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
                              <p className="strPrice">₹ {e.strikedPrice}</p>
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
                           <li>Colour variants for every style</li>
                           <li>Fast Charge in just 15 minutes</li>
                           <li>Ace your workouts with IPX5 rating</li>
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

