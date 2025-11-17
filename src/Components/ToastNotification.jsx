import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import "./Styles/toast.css";

const ToastNotification = ({ message, type = "success", onClose }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Trigger animation
      setIsVisible(true);

      // Auto close after 3 seconds
      const timer = setTimeout(() => {
         setIsVisible(false);
         setTimeout(() => {
            onClose();
         }, 300); // Wait for fade out animation
      }, 3000);

      return () => clearTimeout(timer);
   }, [onClose]);

   return (
      <div className={`toast ${isVisible ? "toast-show" : "toast-hide"}`}>
         <div className="toast-content">
            <AiFillCheckCircle className="toast-icon" />
            <span className="toast-message">{message}</span>
         </div>
      </div>
   );
};

export default ToastNotification;

