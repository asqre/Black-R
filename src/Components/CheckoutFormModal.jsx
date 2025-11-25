import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import "./Styles/checkoutModal.css";

const CheckoutFormModal = ({ isOpen, onClose, totalAmount, onProceedToPayment }) => {
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      housename: "",
      streetName: "",
      landmark: "",
      city: "",
      state: "",
      pincode: ""
   });

   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors(prev => ({
            ...prev,
            [name]: ""
         }));
      }
   };

   const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
         newErrors.name = "Name is required";
      }
      
      if (!formData.phone.trim()) {
         newErrors.phone = "Phone is required";
      } else if (!/^[0-9]{10}$/.test(formData.phone)) {
         newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      
      if (!formData.email.trim()) {
         newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.housename.trim()) {
         newErrors.housename = "House name is required";
      }
      
      if (!formData.streetName.trim()) {
         newErrors.streetName = "Street name is required";
      }
      
      if (!formData.landmark.trim()) {
         newErrors.landmark = "Landmark is required";
      }
      
      if (!formData.city.trim()) {
         newErrors.city = "City is required";
      }
      
      if (!formData.state.trim()) {
         newErrors.state = "State is required";
      }
      
      if (!formData.pincode.trim()) {
         newErrors.pincode = "Pincode is required";
      } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
         newErrors.pincode = "Please enter a valid 6-digit pincode";
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validateForm()) {
         onProceedToPayment(formData);
      }
   };

   if (!isOpen) return null;

   return (
      <>
         {/* Overlay */}
         <div className="checkoutModalOverlay" onClick={onClose}>
            {/* Modal */}
            <div className="checkoutModal" onClick={(e) => e.stopPropagation()}>
            <div className="checkoutModalHeader">
               <h2 className="checkoutModalTitle">Delivery Details</h2>
               <button className="checkoutModalCloseBtn" onClick={onClose}>
                  <ImCross size={18} />
               </button>
            </div>
            
            <form className="checkoutForm" onSubmit={handleSubmit}>
               <div className="formSection">
                  <h3 className="formSectionTitle">Personal Information</h3>
                  
                  <div className="formGroup">
                     <label htmlFor="name">Name *</label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "error" : ""}
                        placeholder="Enter your full name"
                     />
                     {errors.name && <span className="errorMessage">{errors.name}</span>}
                  </div>
                  
                  <div className="formGroup">
                     <label htmlFor="phone">Phone *</label>
                     <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "error" : ""}
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                     />
                     {errors.phone && <span className="errorMessage">{errors.phone}</span>}
                  </div>
                  
                  <div className="formGroup">
                     <label htmlFor="email">Email *</label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "error" : ""}
                        placeholder="Enter your email address"
                     />
                     {errors.email && <span className="errorMessage">{errors.email}</span>}
                  </div>
               </div>
               
               <div className="formSection">
                  <h3 className="formSectionTitle">Address Information</h3>
                  
                  <div className="formGroup">
                     <label htmlFor="housename">House Name/Building *</label>
                     <input
                        type="text"
                        id="housename"
                        name="housename"
                        value={formData.housename}
                        onChange={handleChange}
                        className={errors.housename ? "error" : ""}
                        placeholder="Enter house/building name"
                     />
                     {errors.housename && <span className="errorMessage">{errors.housename}</span>}
                  </div>
                  
                  <div className="formGroup">
                     <label htmlFor="streetName">Street Name *</label>
                     <input
                        type="text"
                        id="streetName"
                        name="streetName"
                        value={formData.streetName}
                        onChange={handleChange}
                        className={errors.streetName ? "error" : ""}
                        placeholder="Enter street name"
                     />
                     {errors.streetName && <span className="errorMessage">{errors.streetName}</span>}
                  </div>
                  
                  <div className="formGroup">
                     <label htmlFor="landmark">Landmark *</label>
                     <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className={errors.landmark ? "error" : ""}
                        placeholder="Enter nearby landmark"
                     />
                     {errors.landmark && <span className="errorMessage">{errors.landmark}</span>}
                  </div>
                  
                  <div className="formRow">
                     <div className="formGroup">
                        <label htmlFor="city">City *</label>
                        <input
                           type="text"
                           id="city"
                           name="city"
                           value={formData.city}
                           onChange={handleChange}
                           className={errors.city ? "error" : ""}
                           placeholder="Enter city"
                        />
                        {errors.city && <span className="errorMessage">{errors.city}</span>}
                     </div>
                     
                     <div className="formGroup">
                        <label htmlFor="state">State *</label>
                        <input
                           type="text"
                           id="state"
                           name="state"
                           value={formData.state}
                           onChange={handleChange}
                           className={errors.state ? "error" : ""}
                           placeholder="Enter state"
                        />
                        {errors.state && <span className="errorMessage">{errors.state}</span>}
                     </div>
                  </div>
                  
                  <div className="formGroup">
                     <label htmlFor="pincode">Pincode *</label>
                     <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={errors.pincode ? "error" : ""}
                        placeholder="Enter 6-digit pincode"
                        maxLength="6"
                     />
                     {errors.pincode && <span className="errorMessage">{errors.pincode}</span>}
                  </div>
               </div>
               
               <div className="formFooter">
                  <div className="orderTotal">
                     <span className="totalLabel">Order Total:</span>
                     <span className="totalAmount">₹{totalAmount}.00</span>
                  </div>
                  <div className="formActions">
                     <button type="button" className="cancelBtn" onClick={onClose}>
                        Cancel
                     </button>
                     <button type="submit" className="proceedBtn">
                        Proceed to Payment
                     </button>
                  </div>
               </div>
            </form>
            </div>
         </div>
      </>
   );
};

export default CheckoutFormModal;

