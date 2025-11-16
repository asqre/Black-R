import "./App.css";
import "./Components/Products/Products.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Products } from "./Components/Products/Products";
import Checkout from "./Components/Payments/Checkout";
import Payments from "./Components/Payments/Payments";
import Otp from "./Components/Payments/Otp";
import { Login } from "./Components/login/Login";
import { Register } from "./Components/login/Register";
import { ProductDetails } from "./Components/Productdescription/productdetails";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
   return (
      <div className="App">
         <Navbar />
         <ScrollToTop />
         <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
         </Routes>
         <Footer />
      </div>
   );
}

export default App;
