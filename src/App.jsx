import "./App.css";
import "./Components/Products/Products.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Products } from "./Components/Products/Products";
import Checkout from "./Components/Payments/Checkout";
import Payments from "./Components/Payments/Payments";
import Otp from "./Components/Payments/Otp";
import { Login } from "./Components/login/Login";
import { Register } from "./Components/login/Register";
import { ProductDetails } from "./Components/Productdescription/productdetails";
import ScrollToTop from "./Components/ScrollToTop";
import AdminLayout from "./Components/Admin/AdminLayout";
import Dashboard from "./Components/Admin/Dashboard";
import Orders from "./Components/Admin/Orders";
import ProductsAdmin from "./Components/Admin/Products";
import Categories from "./Components/Admin/Categories";
import Users from "./Components/Admin/Users";
import ProtectedAdminRoute from "./Components/Admin/ProtectedAdminRoute";

function AppContent() {
   const location = useLocation();
   const isAdminRoute = location.pathname.startsWith('/admin');

   return (
      <div className="App">
         {!isAdminRoute && <Navbar />}
         <ScrollToTop />
         <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route
               path="/admin"
               element={
                  <ProtectedAdminRoute>
                     <AdminLayout />
                  </ProtectedAdminRoute>
               }
            >
               <Route index element={<Navigate to="/admin/dashboard" replace />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="orders" element={<Orders />} />
               <Route path="products" element={<ProductsAdmin />} />
               <Route path="categories" element={<Categories />} />
               <Route path="users" element={<Users />} />
            </Route>
         </Routes>
         {!isAdminRoute && <Footer />}
      </div>
   );
}

function App() {
   return <AppContent />;
}

export default App;
