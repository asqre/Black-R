import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { paymentDetails, formData, totalAmount } = location.state || {};

   if (!paymentDetails) {
      return (
         <div className="paymentSuccessContainer">
            <div className="paymentSuccessCard">
               <h2>No payment details found</h2>
               <button onClick={() => navigate("/")} className="homeBtn">
                  Go to Home
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="paymentSuccessContainer">
         <div className="paymentSuccessCard">
            <div className="successIcon">
               <AiFillCheckCircle />
            </div>
            <h2>Order Confirmed!</h2>
            <p className="successMessage">
               Thank you for your order! Your payment has been processed successfully and your order has been confirmed. Your cart has been cleared.
            </p>
            <div className="confirmationBadge">
               <AiFillCheckCircle />
               <span>Order Confirmed</span>
            </div>

            <div className="paymentDetails">
               <h3>Payment Details</h3>
               <div className="detailRow">
                  <span>Payment ID:</span>
                  <span>{paymentDetails.razorpay_payment_id}</span>
               </div>
               <div className="detailRow">
                  <span>Order ID:</span>
                  <span>{paymentDetails.razorpay_order_id}</span>
               </div>
               <div className="detailRow">
                  <span>Amount Paid:</span>
                  <span className="amount">₹{totalAmount}.00</span>
               </div>
               {formData && (
                  <>
                     <div className="detailRow">
                        <span>Name:</span>
                        <span>{formData.name}</span>
                     </div>
                     <div className="detailRow">
                        <span>Email:</span>
                        <span>{formData.email}</span>
                     </div>
                  </>
               )}
            </div>

            <div className="successActions">
               <button 
                  onClick={() => navigate("/track-order", { 
                     state: { 
                        orderId: paymentDetails?.razorpay_order_id,
                        email: formData?.email 
                     } 
                  })} 
                  className="trackOrderBtn"
               >
                  Track Order
               </button>
               <button onClick={() => navigate("/")} className="homeBtn">
                  Continue Shopping
               </button>
            </div>
         </div>
      </div>
   );
};

export default PaymentSuccess;

