import React from "react";
import "../Styles/home.css";
import BoatBlogs from "./BoatBlogs";
import { CarouselDiv } from "./Carousel";
import NewLaunches from "./NewLaunches";
import PressComponent from "./PressComponent";
import TopSellers from "./TopSellers";
import TrendingEarphones from "./TrendingEarphones";
import TrendingHeadphones from "./TrendingHeadphones";
import AllProducts from "./AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/AddToCart/actions";
import Grooming from "./Grooming";
import { useToast } from "../../Context/ToastContext";

const Home = () => {
   const dispatch = useDispatch();
   const { showToast } = useToast();
   const cartItems = useSelector((store) => store.cart.data);

   const handleDispatch = (item) => {
      // Check if item already exists in cart
      const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
      
      if (existingItem) {
         showToast(`${item.productName} - quantity increased in your Cart`);
      } else {
         showToast(`${item.productName} - added to your Cart`);
      }
      
      dispatch(addToCart(item));
   };

   return (
      <div>
         <CarouselDiv />
         <AllProducts handleDispatch={handleDispatch} />
         {/* <TopSellers handleDispatch={handleDispatch} /> */}
         {/* <TrendingEarphones handleDispatch={handleDispatch} /> */}
         {/* <NewLaunches /> */}
         {/* <TrendingHeadphones handleDispatch={handleDispatch} /> */}
         {/* <Grooming handleDispatch={handleDispatch} /> */}
         {/* <BoatBlogs /> */}
         <PressComponent />
      </div>
   );
};

export default Home;
