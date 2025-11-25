import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdSearch, MdLocationOn, MdLocalShipping, MdCheckCircle, MdCancel } from "react-icons/md";
import { AiOutlineClockCircle, AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import "./OrderTracking.css";

const OrderTracking = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [orderId, setOrderId] = useState(location.state?.orderId || "");
   const [email, setEmail] = useState(location.state?.email || "");
   const [order, setOrder] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const getStatusSteps = (status) => {
      const steps = [
         { id: 1, name: "Order Placed", icon: AiOutlineClockCircle, status: "completed" },
         { id: 2, name: "Processing", icon: MdCheckCircle, status: "pending" },
         { id: 3, name: "Shipped", icon: MdLocalShipping, status: "pending" },
         { id: 4, name: "Delivered", icon: MdLocationOn, status: "pending" },
      ];

      const statusMap = {
         pending: { current: 1, completed: [1] },
         processing: { current: 2, completed: [1, 2] },
         shipped: { current: 3, completed: [1, 2, 3] },
         delivered: { current: 4, completed: [1, 2, 3, 4] },
         cancelled: { current: 0, completed: [] },
      };

      const statusInfo = statusMap[status] || statusMap.pending;
      
      return steps.map((step) => ({
         ...step,
         status: statusInfo.completed.includes(step.id)
            ? "completed"
            : statusInfo.current === step.id
            ? "current"
            : "pending",
      }));
   };

   const getStatusBadge = (status) => {
      const statusMap = {
         pending: { class: "status-pending", label: "Pending" },
         processing: { class: "status-processing", label: "Processing" },
         shipped: { class: "status-shipped", label: "Shipped" },
         delivered: { class: "status-delivered", label: "Delivered" },
         cancelled: { class: "status-cancelled", label: "Cancelled" },
      };
      const statusInfo = statusMap[status] || statusMap.pending;
      return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>;
   };

   const handleSearch = async (e) => {
      e.preventDefault();
      setError("");
      setOrder(null);

      if (!orderId.trim() && !email.trim()) {
         setError("Please enter Order ID or Email to track your order");
         return;
      }

      setLoading(true);
      try {
         // Try to fetch order by ID or email
         // For now, using mock data structure - replace with actual API call
         const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/order/track`,
            {
               params: {
                  orderId: orderId.trim() || undefined,
                  email: email.trim() || undefined,
               },
            }
         );

         if (response.data && response.data.order) {
            setOrder(response.data.order);
         } else {
            setError("Order not found. Please check your Order ID and Email.");
         }
      } catch (err) {
         console.error("Error fetching order:", err);
         // For demo purposes, use mock data if API fails
         if (orderId.trim() || email.trim()) {
            const mockOrder = {
               id: orderId || "ORD-001",
               orderId: orderId || "ORD-001",
               customer: "John Doe",
               email: email || "john@example.com",
               phone: "+91-9876543210",
               orderItems: [
                  {
                     name: "R-001 TWS",
                     quantity: 1,
                     price: 1999,
                  },
               ],
               total: 1999,
               subtotal: 1994.8,
               shipping: 5.2,
               status: "processing",
               orderDate: new Date().toISOString().split("T")[0],
               deliveryAddress: {
                  addreslin1: "123 Main Street, Near Park",
                  city: "Mumbai",
                  state: "Maharashtra",
                  pincode: "400001",
               },
               paymentMethod: "CRED",
               trackingNumber: "TRACK123456789",
            };
            setOrder(mockOrder);
         } else {
            setError("Order not found. Please check your Order ID and Email.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="orderTrackingContainer">
         <div className="orderTrackingCard">
            <div className="trackingHeader">
               <h1>Track Your Order</h1>
               <p>Enter your Order ID or Email to track your order status</p>
            </div>

            <form onSubmit={handleSearch} className="trackingSearchForm">
               <div className="searchInputGroup">
                  <MdSearch className="searchIcon" />
                  <input
                     type="text"
                     placeholder="Order ID (e.g., ORD-001)"
                     value={orderId}
                     onChange={(e) => setOrderId(e.target.value)}
                     className="searchInput"
                  />
               </div>
               <div className="searchInputGroup">
                  <MdSearch className="searchIcon" />
                  <input
                     type="email"
                     placeholder="Email Address"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="searchInput"
                  />
               </div>
               <button type="submit" className="trackButton" disabled={loading}>
                  {loading ? "Searching..." : "Track Order"}
               </button>
            </form>

            {error && <div className="errorMessage">{error}</div>}

            {order && (
               <div className="orderDetails">
                  <div className="orderHeader">
                     <div>
                        <h2>Order #{order.orderId || order.id}</h2>
                        <p className="orderDate">Placed on {new Date(order.orderDate || order.date).toLocaleDateString()}</p>
                     </div>
                     {getStatusBadge(order.status)}
                  </div>

                  {/* Order Timeline */}
                  <div className="orderTimeline">
                     {getStatusSteps(order.status).map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === getStatusSteps(order.status).length - 1;
                        return (
                           <div key={step.id} className={`timelineStep ${step.status}`}>
                              <div className="timelineIcon">
                                 {step.status === "completed" ? (
                                    <AiFillCheckCircle className="icon completed" />
                                 ) : step.status === "current" ? (
                                    <Icon className="icon current" />
                                 ) : (
                                    <Icon className="icon pending" />
                                 )}
                              </div>
                              {!isLast && <div className="timelineLine"></div>}
                              <div className="timelineContent">
                                 <h3 className={step.status}>{step.name}</h3>
                                 {step.status === "current" && (
                                    <p className="timelineStatus">In Progress</p>
                                 )}
                                 {step.status === "completed" && (
                                    <p className="timelineStatus">Completed</p>
                                 )}
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  {/* Order Items */}
                  <div className="orderSection">
                     <h3>Order Items</h3>
                     <div className="orderItemsList">
                        {(order.orderItems || []).map((item, index) => (
                           <div key={index} className="orderItem">
                              <div className="itemInfo">
                                 <span className="itemName">{item.name || item.product}</span>
                                 <span className="itemQuantity">Qty: {item.quantity || 1}</span>
                              </div>
                              <span className="itemPrice">₹{(item.price || 0).toLocaleString()}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Order Summary */}
                  <div className="orderSection">
                     <h3>Order Summary</h3>
                     <div className="summaryRow">
                        <span>Subtotal:</span>
                        <span>₹{order.subtotal?.toLocaleString() || order.total?.toLocaleString()}</span>
                     </div>
                     <div className="summaryRow">
                        <span>Shipping:</span>
                        <span>₹{order.shipping?.toLocaleString() || "0"}</span>
                     </div>
                     <div className="summaryRow total">
                        <span>Total:</span>
                        <span>₹{order.total?.toLocaleString()}</span>
                     </div>
                  </div>

                  {/* Delivery Address */}
                  {order.deliveryAddress && (
                     <div className="orderSection">
                        <h3>Delivery Address</h3>
                        <div className="addressDetails">
                           <p>{order.deliveryAddress.addreslin1 || order.deliveryAddress.address}</p>
                           <p>
                              {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                     <div className="orderSection">
                        <h3>Tracking Information</h3>
                        <div className="trackingInfo">
                           <p>
                              <strong>Tracking Number:</strong> {order.trackingNumber}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Payment Info */}
                  <div className="orderSection">
                     <h3>Payment Information</h3>
                     <div className="paymentInfo">
                        <p>
                           <strong>Payment Method:</strong> {order.paymentMethod || "Online Payment"}
                        </p>
                        <p>
                           <strong>Payment Status:</strong> <span className="paymentStatus">Paid</span>
                        </p>
                     </div>
                  </div>

                  <div className="orderActions">
                     <button onClick={() => navigate("/")} className="continueShoppingBtn">
                        Continue Shopping
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default OrderTracking;

