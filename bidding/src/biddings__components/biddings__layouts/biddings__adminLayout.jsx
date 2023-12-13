// Importing necessary components and assets
import logo from "../../biddings__assests/images/logo.png";
import React from "react";
import { Layout, theme } from "antd";
import { Avatar, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout___logout } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import { Biddings___Sidebar } from "../../biddings__commons/biddings__Sidebar";

// Destructuring Layout components from Ant Design
const { Header, Content, Footer } = Layout;

// Functional component for the Admin Layout
export const AdminLayout___AdminLayout = ({ children }) => {
  // Extracting colorBgContainer from the Ant Design theme
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Extracting isLoggedIn state from the Redux store
  const { is___LoggedIn } = useSelector((state) => state.auth___auth);

  // Creating dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Creating navigate function using useNavigate from react-router-dom
  const navigate = useNavigate();

  // Handling logout functionality
  const handleLogout = async () => {
    await dispatch(logout___logout());
    navigate("/");
  };

  // Checking if the user is logged in
  if (is___LoggedIn) {
    return (
      <>
        {/* Main layout structure using Ant Design's Layout component */}
        <Layout className="h-screen">
          {/* Sidebar component for navigation */}
          <Biddings___Sidebar />
          {/* Main content layout */}
          <Layout>
            {/* Header section */}
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex", // Add display flex to align items vertically
                alignItems: "center", // Center vertically
              }}
            >
              {/* Header content with logo, logout button, and avatar */}
              <div className="flex px-5 w-full justify-between">
                {/* Logo section */}
                <div>
             
                </div>
                {/* Logout button and user avatar section */}
                <div className="flex gap-3">
                  {/* Logout button */}
                  <Button onClick={handleLogout}>Logout</Button>
                  {/* User avatar */}
                </div>
              </div>
            </Header>
            {/* Main content section */}
            <Content
              style={{
                margin: "24px 16px 0",
              }}
            >
              {/* Container for rendering the actual content */}
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                {/* Displaying the children components passed to AdminLayout */}
                {children}
              </div>
            </Content>
            {/* Footer section */}
          </Layout>
        </Layout>
      </>
    );
  }

  // If the user is not logged in, return a message indicating not authorized
  return "not authorized";
};
