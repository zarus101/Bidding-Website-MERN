// In this line: Importing necessary dependencies and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Header } from "antd/es/layout/layout";
import { NotLoggedIn___NotLoggedIn, ShowToLoggednIn___ShowToLoggednIn } from "../biddings__components/biddings__authComponents/biddings__restricts";
import { Biddings__BuyerDialog } from "../biddings__components/biddings__authComponents/biddings__BuyerDrawer";
import { SellerDialog___SellerDialog } from "../biddings__components/biddings__authComponents/biddings__SellerDrawer";
import { logout___logout } from "../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";

// In this line: Component for the main navigation bar
const Biddings___MainNavbar = () => {
  // In this line: Hooks for navigation and Redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // In this line: Function to handle logout
  const handleLogout = async () => {
    await dispatch(logout___logout()); // Dispatching the logout action
    navigate("/"); // Navigating to the home page after logout
  };

  // In this line: State for the Buyer Drawer
  const [buyerOpen, setBuyerOpen] = useState(false);

  // In this line: Function to show the Buyer Drawer
  const showBuyerDrawer = () => {
    setBuyerOpen(true);
    setRole("buyer"); // Setting the role to "buyer"
  };

  // In this line: Function to close the Buyer Drawer
  const onBuyerClose = () => {
    setBuyerOpen(false);
  };

  // In this line: State and function for the Seller Drawer
  const [sellerOpen, setSellerOpen] = useState(false);
  const [role, setRole] = useState();

  // In this line: Function to handle opening/closing the Seller Drawer
  const handleSellerOpen = () => {
    setSellerOpen((cur) => !cur); // Toggling the Seller Drawer
    setRole("seller"); // Setting the role to "seller"
  };

  return (
    <Header
      style={{
        padding: 0,
        background: "white",
        display: "flex", // Adding display flex
        alignItems: "center", // Centering vertically
      }}
    >
      {/* In this line: Main navigation bar content */}
      <div className="flex containers w-full justify-center">
        <div className="flex gap-3">
          {/* In this line: Buttons displayed when the user is not logged in */}
          <NotLoggedIn___NotLoggedIn>
            <Button ripple={true} onClick={showBuyerDrawer}>
              Be the buyer
            </Button>
            <Button ripple={true} color="red" onClick={handleSellerOpen}>
              Be the Seller
            </Button>
          </NotLoggedIn___NotLoggedIn>

          {/* In this line: Button displayed when the user is logged in */}
          <ShowToLoggednIn___ShowToLoggednIn>
            <Button onClick={handleLogout} color="red">
              Logout
            </Button>
          </ShowToLoggednIn___ShowToLoggednIn>
        </div>
      </div>

      {/* In this line: Buyer and Seller Dialog components */}
      <Biddings__BuyerDialog onClose={onBuyerClose} open={buyerOpen} role={role} />
      <SellerDialog___SellerDialog onClose={handleSellerOpen} open={sellerOpen} role={role} />
    </Header>
  );
};

// In this line: Exporting the component
export default Biddings___MainNavbar;
