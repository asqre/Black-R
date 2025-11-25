import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../../assets/Banner1.png";

export const CarouselDiv = () => {
   return (
      <Carousel 
         className="carousel"
         autoPlay={true}
         infiniteLoop={true}
         interval={3000}
         showThumbs={false}
         showStatus={false}
         swipeable={true}
         emulateTouch={true}
         transitionTime={500}
         animationHandler="fade"
      >
         <div className="carousel-slide">
            <img
               src={Banner1}
               alt="Black-R Banner"
            />
         </div>
      </Carousel>
   );
};

export default CarouselDiv;
