// Importing the required styles and dependencies
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus___getLoginStatus } from "./biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import { NormalLayout___NormalLayout } from "./biddings__components/biddings__layouts/biddings__normalLayout";
import LandingPage from "./biddings__pages/biddings___landing/bidding___index";
import Biddings___VerifyUser from "./biddings__pages/bidding___verify";
import { Biddings___BuyerLayout } from "./biddings__components/biddings__layouts/biddings__buyerLayout";
import Home___Home from "./biddings__pages/biddings___buyer/biddings___index";
import { SellerLayout } from "./biddings__components/biddings__layouts/biddings__sellerLayout";
import Seller___Dashboard from "./biddings__pages/biddings___seller/biddings__index";
import Biddings__ProductDetails from "./biddings__pages/biddings___productDetails";
import { AdminLayout___AdminLayout } from "./biddings__components/biddings__layouts/biddings__adminLayout";
import Biddings__AdminDashboard from "./biddings__pages/biddings___admin/biddings__dashboard";
import Biddings__User from "./biddings__pages/biddings___admin/biddings__users";
import Biddings__Products from "./biddings__pages/biddings___admin/biddings__products";

// Configuring Axios so that each request includes credentials
axios.default.withCredentials = true;

function App() {
  // Starting the Redux dispatch process
  const dispatch = useDispatch();

  //When the component mounts, use the Effect hook to send an action to retrieve the login status.
  useEffect(() => {
    dispatch(getLoginStatus___getLoginStatus());
  }, [dispatch]);

  // Primary component that renders the structure of the application
  return (
    <div>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
      {/* Configuring a React router with routes and route components */}{" "}
      <Routes>
        {/* Route for landing pages */}
        <Route
          path="/"
          element={
            <NormalLayout___NormalLayout>
              <LandingPage />
            </NormalLayout___NormalLayout>
          }
        />
        {/* Path for user verification */}{" "}
        <Route
          path="/verify/:verificationToken"
          element={
            <NormalLayout___NormalLayout>
              <Biddings___VerifyUser />
            </NormalLayout___NormalLayout>
          }
        />
        {/*This is the buyer's route */}
        <Route
          path="/buyer/home"
          element={
            <Biddings___BuyerLayout>
              <Home___Home />
            </Biddings___BuyerLayout>
          }
        />
        {/* The seller dashboard's route */}{" "}
        <Route
          path="/seller/dashboard"
          element={
            <SellerLayout>
              <Seller___Dashboard />
            </SellerLayout>
          }
          exact={true}
        />
        {/* Path to see a seller's product details*/}
        <Route
          path="/admin/product/:fullName/:postedItemName/:id"
          element={
            <SellerLayout>
              <Biddings__ProductDetails />
            </SellerLayout>
          }
        />
        {/* Path for a buyer to view product details*/}{" "}
        <Route
          path="/buyer/product/:fullName/:postedItemName/:id"
          element={
            <Biddings___BuyerLayout>
              <Biddings__ProductDetails />
            </Biddings___BuyerLayout>
          }
        />
        {/* The admin section's routes*/}{" "}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout___AdminLayout>
              <Biddings__AdminDashboard />
            </AdminLayout___AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout___AdminLayout>
              <Biddings__User />
            </AdminLayout___AdminLayout>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminLayout___AdminLayout>
              <Biddings__Products />
            </AdminLayout___AdminLayout>
          }
        />
        {/* A route to manage unidentified paths */} <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
