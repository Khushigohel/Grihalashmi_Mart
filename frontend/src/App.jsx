import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Registration from "./pages/user/Registration";
import Category from "./pages/user/Category";
import Product from "./pages/user/Product";
import ForgotPassword from "./pages/user/ForgotPassword";
import Profile from "./pages/user/Profile";
import CartPage from "./pages/user/CartPage";

import LoginAdmin from "./pages/admin/LoginAdmin";
import Dashboard from "./pages/admin/Dashboard";
import AdminPrivateRoute from "./pages/admin/AdminPrivateRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageProducts from "./pages/admin/ManageProduct";
import AddProduct from "./pages/admin/AddProduct";
import Orders from "./pages/admin/Orders";
import Payments from "./pages/admin/Payments";
import Users from "./pages/admin/Users";
import ProductDetails from "./pages/user/ProductDetails";
import CheckoutPage from "./pages/user/checkoutPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/product" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>

        <Route path="/admin/loginadmin" element={<LoginAdmin />} />
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-products" element={<ManageProducts/>}/>
          <Route path="add-product" element={<AddProduct/>}/>
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} /> 
          <Route path="users" element={<Users />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
