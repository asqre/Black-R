import React, { useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const LoginPopup = ({ setLogin, login }) => {
   const popupRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (popupRef.current && !popupRef.current.contains(event.target)) {
            // Check if click is on the profile icon
            const isProfileIcon = event.target.closest('[data-profile-icon="true"]') || 
                                 event.target.hasAttribute('data-profile-icon');
            
            // If clicking on profile icon, don't close (let Navbar handle toggle)
            if (isProfileIcon) {
               return;
            }
            
            // Close popup for any other outside click
            setLogin(false);
         }
      };

      if (login) {
         // Use a small delay to avoid immediate closure when opening
         const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
         }, 0);

         return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }
   }, [login, setLogin]);

   const handleClose = () => {
      setLogin(false);
   };

   return (
      <div className="loginPopup" ref={popupRef}>
         <div className="flex popupUpperDiv">
            <p className="popupText">Hi boAthead!</p>
            <ImCross onClick={handleClose} size={13} style={{ cursor: "pointer" }} />
         </div>
         <Link to={"/login"}>
            <button onClick={handleClose} className="popUpBtn">
               Login
            </button>
         </Link>
      </div>
   );
};

export default LoginPopup;
