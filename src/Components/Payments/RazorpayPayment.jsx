import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./RazorpayPayment.css";
import axios from "axios";
import { clearCart } from "../../Redux/AddToCart/actions";

const RazorpayPayment = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { formData, totalAmount, cartItems } = location.state || {};
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   
   // Calculate shipping (you can adjust this logic as needed)
   const shipping = 5.20; // Default shipping cost
   const subtotal = totalAmount || 0;
   const total = subtotal + shipping;
   
   // Build order payload in the required format
   const buildOrderPayload = () => {
      const orderItems = (cartItems || []).map(item => ({
         category: item.itemCategory || "general",
         name: item.productName || "",
         price: parseFloat(item.price) || 0,
         tokenId: item._id || item.tokenId || "",
         color: item.color || item.selectedColor || "white", // Extract color if available
         quantity: item.quantity || 1
      }));

      // Build destination address - using exact field names from user's format
      // Note: Using "destionation_address" and "addreslin1" as shown in user's example
      // Combine address fields into a single line
      const addressParts = [
         formData?.housename,
         formData?.streetName,
         formData?.landmark
      ].filter(Boolean);
      
      const destionation_address = {
         addreslin1: addressParts.join(", ") || "",
         city: formData?.city || "",
         state: formData?.state || "",
         pincode: formData?.pincode || ""
      };

      return {
         orderItems,
         destionation_address,
         subtotal: parseFloat(subtotal.toFixed(2)),
         shipping: parseFloat(shipping.toFixed(2)),
         total: parseFloat(total.toFixed(2)),
         name: formData?.name || "",
         email: formData?.email || "",
         phone: formData?.phone || "",
         paymentMethod: "CRED" // Default payment method, can be made dynamic
      };
   };
   
   const [order, setOrder] = useState({
     amount: totalAmount*100,
     currency: "INR",
     receipt: "qwsaq1",
   });
   const razorPayAPIKey = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  };
   
  const initializeRazorpay = () => {
   return new Promise((resolve) => {
     const script = document.createElement("script");
     script.src = "https://checkout.razorpay.com/v1/checkout.js";

     script.onload = () => {
       resolve(true);
     };
     script.onerror = () => {
       resolve(false);
     };

     document.body.appendChild(script);
   });
 };

 const checkoutHandler = async (order) => {
   try {
     const res = await initializeRazorpay();

     setLoading(false);

     if (!res) {
      //  toast.error("Razorpay SDK Failed to load");
       return;
     }

     const options = {
       key: razorPayAPIKey?.key || "",
       amount: order.amount,
       currency: order.currency,
       name: "Rk Enterprises",
       description: "Rk Enterprises Booking",
       image:
         "https://thumbs.dreamstime.com/b/gradient-fire-phoenix-bird-simple-logo-design-black-bird-simple-logo-design-simple-gradient-fire-phoenix-bird-logo-158339374.jpg",
       order_id: order.id,
       // callback_url: `${process.env.REACT_APP_SERVER_URL}/booking/payment-verification`,
       handler: async function (response) {
         const body = {
           ...response,
         };

         try {
            const validateRes = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/payment-verification`,
              body,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // Clear cart after successful payment verification
            dispatch(clearCart());

            // Navigate to success page with payment details
            navigate("/payment-success", {
               state: {
                  paymentDetails: response,
                  formData: formData,
                  totalAmount: totalAmount,
               },
            });
         } catch (error) {
            console.error("Payment verification failed:", error);
            // Razorpay handler only fires on successful payment, so we clear cart and show success
            // even if backend verification fails (payment was successful on Razorpay's end)
            dispatch(clearCart());
            navigate("/payment-success", {
               state: {
                  paymentDetails: response,
                  formData: formData,
                  totalAmount: totalAmount,
               },
            });
         }
       },
       prefill: {
         name: "Amit Anand",
         email: "sd.amitanand@gmail.com",
         contact: "+91-8709543192",
       },
       notes: {
         address: "Rk Enterprises",
       },
       theme: {
         color: "#3399cc",
       },
     };

     const paymentObject = new window.Razorpay(options);

     paymentObject.on("payment.failed", function (response) {
       console.log(response.error.code);
       console.log(response.error.description);
       console.log(response.error.source);
       console.log(response.error.step);
       console.log(response.error.reason);
       console.log(response.error.metadata.order_id);
       console.log(response.error.metadata.payment_id);
     });

     paymentObject.open();
   } catch (error) {
     console.error("Payment initialization failed:", error);
   }
 };

 const paymentHandler = async (e) => {
   e.preventDefault();
   setLoading(true);
   try {
     // Build the order payload in the required format
     const orderPayload = buildOrderPayload();
     
     const res = await axios.post(
       `${process.env.REACT_APP_SERVER_URL}/order/new`,
       orderPayload,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

    

     const orderData = res.data?.order;

     

     await checkoutHandler(orderData);
   } catch (error) {
     setLoading(false);
     console.error("Error while fetching razorpay API key", error);
     setError("Failed to process order. Please try again.");
   }
 };

   return (
      <div className="razorpayContainer">
         <div className="razorpayCard">
            <div className="razorpayHeader">
               <h2>Complete Your Payment</h2>
               <p className="razorpaySubtitle">Review your order details before proceeding</p>
            </div>

            <div className="orderSummarySection">
               <h3>Order Summary</h3>
               <div className="summaryRow">
                  <span>Name:</span>
                  <span>{formData.name}</span>
               </div>
               <div className="summaryRow">
                  <span>Email:</span>
                  <span>{formData.email}</span>
               </div>
               <div className="summaryRow">
                  <span>Phone:</span>
                  <span>{formData.phone}</span>
               </div>
               <div className="summaryRow">
                  <span>Address:</span>
                  <span>
                     {formData.housename}, {formData.streetName}, {formData.landmark}, {formData.city}, {formData.state} - {formData.pincode}
                  </span>
               </div>
               <div className="summaryDivider"></div>
               <div className="summaryRow">
                  <span>Items:</span>
                  <span>{cartItems?.length || 0} item(s)</span>
               </div>
               <div className="summaryRow totalRow">
                  <span>Total Amount:</span>
                  <span className="totalPrice">₹{totalAmount}.00</span>
               </div>
            </div>

            {error && <div className="errorAlert">{error}</div>}

            <div className="razorpayActions">
               <button
                  className="backBtn"
                  onClick={() => navigate(-1)}
                  disabled={loading}
               >
                  Go Back
               </button>
               <button
                  className="payBtn"
                  onClick={paymentHandler}
                  disabled={loading}
               >
                  {loading ? "Processing..." : `Pay ₹${totalAmount}.00`}
               </button>
            </div>

            <div className="razorpayFooter">
               <p>Secure payment powered by Razorpay</p>
            </div>
         </div>
      </div>
   );
};

export default RazorpayPayment;

