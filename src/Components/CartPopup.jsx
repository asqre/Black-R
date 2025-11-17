import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart, AiFillGift, AiFillCheckCircle } from "react-icons/ai";
import "./Styles/cart.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { delFromCart, updateQuantity } from "../Redux/AddToCart/actions";

const CartPopup = ({ cart, setCart }) => {
   const cartItems = useSelector((store) => store.cart.data);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [wishlistItems, setWishlistItems] = useState({});
   const [imageErrors, setImageErrors] = useState({});

   const handleImageError = (productId) => {
      setImageErrors(prev => ({ ...prev, [productId]: true }));
   };

   const handleDelete = (id) => {
      dispatch(delFromCart({ id: id }));
   };

   const handleQuantityChange = (id, quantity) => {
      const qty = parseInt(quantity);
      if (qty >= 1 && qty <= 10) {
         dispatch(updateQuantity(id, qty));
      }
   };

   const handleIncrement = (id, currentQty) => {
      if (currentQty < 10) {
         handleQuantityChange(id, currentQty + 1);
      }
   };

   const handleDecrement = (id, currentQty) => {
      if (currentQty > 1) {
         handleQuantityChange(id, currentQty - 1);
      }
   };

   const toggleWishlist = (id) => {
      setWishlistItems({ ...wishlistItems, [id]: !wishlistItems[id] });
   };

   const totalAmount = cartItems.reduce((sum, item) => {
      const qty = item.quantity || 1;
      return sum + item.price * qty;
   }, 0);

   return (
      <>
         {/* Overlay/Backdrop */}
         {cart && (
            <div 
               className="cartOverlay" 
               onClick={() => setCart(false)}
            ></div>
         )}
         <div 
            className={`cart ${cart ? 'cart-open' : 'cart-closed'}`}
            onClick={(e) => e.stopPropagation()}
         >
            {/* Close button */}
            <div className="cartCloseBtn" onClick={() => setCart(false)}>
               <ImCross size={20} />
            </div>

         {/* Header */}
         <div className="cartHeaderNew">
            <h2 className="cartTitle">Items in my bag</h2>
            {/* {cartItems.length > 0 && (
               <div className="cartHeaderIcons">
                  <FiTrash2 className="headerIcon" size={20} />
                  <AiOutlineHeart className="headerIcon" size={20} />
               </div>
            )} */}
         </div>

         {/* Cart Items */}
         <div className="mappingItems">
            {cartItems.length === 0 ? (
               <div className="emptyCart">
                  <div className="emptyCartIconWrapper">
                     <div className="bagIconContainer">
                        <FiShoppingBag  className="emptyCartBagIcon" />
                        <div className="bagEyes">
                           <div className="bagEye"></div>
                           <div className="bagEye"></div>
                        </div>
                     </div>
                     <div className="decorativeCircles">
                        <div className="decorativeCircle circle1"></div>
                        <div className="decorativeCircle circle2"></div>
                        <div className="decorativeCircle circle3"></div>
                        <div className="decorativeCircle circle4"></div>
                     </div>
                  </div>
                  <p className="emptyCartText">Fill the bag with your favorite styles</p>
                  <button 
                     className="continueShoppingBtn"
                     onClick={() => {
                        setCart(false);
                        navigate("/");
                     }}
                  >
                     Continue shopping
                  </button>
               </div>
            ) : (
               cartItems.map((e, i) => {
                  const currentQty = e.quantity || 1;
                  return (
                     <div className="cartCardNew" key={i}>
                        <div className="cartItemImageWrapper">
                           {imageErrors[e._id] || !e.imageURLcolor1 ? (
                              <div className="smallCartImg imagePlaceholder">
                                 <span>No Image</span>
                              </div>
                           ) : (
                              <>
                                 <img 
                                    className="smallCartImg" 
                                    src={e.imageURLcolor1} 
                                    alt={e.productName}
                                    onError={() => handleImageError(e._id)}
                                 />
                                 <AiFillCheckCircle className="imageCheckIcon" />
                              </>
                           )}
                        </div>
                        <div className="cartItemDetails">
                           <div className="cartItemHeader">
                              <p className="smallCartTitle">{e.productName}</p>
                              <ImCross 
                                 className="removeItemBtn" 
                                 size={14} 
                                 onClick={() => handleDelete(e._id)} 
                              />
                           </div>
                           <div className="cartItemSelects">
                              <div className="quantitySelector">
                                 <button 
                                    className="quantityBtn decrementBtn"
                                    onClick={() => handleDecrement(e._id, currentQty)}
                                    disabled={currentQty <= 1}
                                 >
                                    -
                                 </button>
                                 <span className="quantityValue">{currentQty}</span>
                                 <button 
                                    className="quantityBtn incrementBtn"
                                    onClick={() => handleIncrement(e._id, currentQty)}
                                    disabled={currentQty >= 10}
                                 >
                                    +
                                 </button>
                              </div>
                           </div>
                           <p className="cartItemPrice">₹{e.price}.00</p>
                           {e.itemCategory && (
                              <p className="cartItemStyle">Style: #{e.itemCategory.substring(0, 5).toUpperCase()}</p>
                           )}
                        </div>
                     </div>
                  );
               })
            )}
         </div>

         {/* Gift Card Section - Only show when cart has items */}
         {/* {cartItems.length > 0 && (
            <div className="giftCardSection">
               <AiFillGift className="giftIcon" size={20} />
               <span className="giftCardText">Gift Card/ Gift Voucher</span>
               <button className="giftCardBtn">ADD</button>
            </div>
         )} */}

         {/* Footer - Order Details - Only show when cart has items */}
         {cartItems.length > 0 && (
            <div className="btmCartDiv">
               <h3 className="orderDetailsTitle">Order Details</h3>
               <div className="orderSummary">
                  <div className="flex orderRow">
                     <p className="orderLabel">Subtotal</p>
                     <p className="orderValue">₹{totalAmount}.00</p>
                  </div>
               </div>
               <Link to={"/checkout"} onClick={() => setCart(false)}>
                  <button className="placeOrderBtn">
                     <div className="placeOrderLeft">
                        <span className="placeOrderAmount">₹{totalAmount}.00</span>
                        <span className="placeOrderTax">(Incl. Of All Taxes)</span>
                     </div>
                     <span className="placeOrderText">PLACE ORDER</span>
                  </button>
               </Link>
            </div>
         )}
         </div>
      </>
   );
};

export default CartPopup;
