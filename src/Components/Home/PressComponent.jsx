import React from "react";
import { FaShippingFast, FaTag, FaShieldAlt } from "react-icons/fa";

const PressComponent = () => {
   return (
      <div className="pressComponent">
         <div className="pressDiv">
            <h1 className="pressHeading">Featured In</h1>
            <p className="pressText">
               <span className="pressCommas">❝</span> Black-R revolutionizes the audio experience
               <span className="pressCommas">❞</span>{" "}
            </p>
            <div className="pressLinksDiv flex">
               <img
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/mint_0566185f-75d7-4819-a2a2-e2acc4535e78_200x.png?v=1649066803"
                  alt=""
               />
               <img
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Forbes_1_641a219a-af36-45ee-8d3b-90ca148056c1_200x.png?v=1649066820"
                  alt=""
               />
               <img
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/techradar_1_ba476d16-16de-4a29-baa2-537f33fc7f88_200x.png?v=1649066820"
                  alt=""
               />

               <img
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/gadgets360_1_6a0c2c78-109a-4cbc-be58-05b893a41d4a_231x.png?v=1649066821"
                  alt=""
               />
            </div>
         </div>
         <div className="promise">
            <h1 className="pressHeading">Our Promise</h1>
            <div className="flex lastDivPress">
               <div className="promiseItem">
                  <FaShippingFast className="promiseIcon" />
                  <p>Free Shipping</p>
               </div>
               <div className="promiseItem">
                  <FaTag className="promiseIcon" />
                  <p>Exclusive Deals</p>
               </div>
               <div className="promiseItem">
                  <FaShieldAlt className="promiseIcon" />
                  <p>Secure Checkout</p>
               </div>
            </div>
         </div>
         <div className="disclaimer">
            <p className="disclaimerText">
               Black-R - India's fastest growing audio & wearables brand. The most
               incredible range of wireless earphones, earbuds, headphones,
               smart watches, and home audio. From workouts to adventures, Black-R
               powers your lifestyle!
            </p>
         </div>
      </div>
   );
};

export default PressComponent;
