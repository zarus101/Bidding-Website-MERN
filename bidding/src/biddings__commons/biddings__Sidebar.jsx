// Importing necessary React components and styles from Ant Design
import React from "react";
import { Layout, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
const { Sider } = Layout;

// Component for the sidebar in the admin panel
export const Biddings___Sidebar = () => {
  // Array of custom menu items for the sidebar
  const custom___MenuItems = [
    {
      key: "dashboard",
      icon: <UserOutlined />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      key: "users",
      icon: <VideoCameraOutlined />,
      label: "Users",
      path: "/admin/users",
    },
    {
      key: "products",
      icon: <UploadOutlined />,
      label: "Products",
      path: "/admin/products",
    },
  ];

  // Getting the current location using React Router's useLocation hook
  const location = useLocation();

  // JSX structure for rendering the sidebar
  return (
    <Sider
      breakpoint="xxl"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="bg-red-500"
    >
      {/* Logo or branding can be added here */}
      <div className="demo-logo-vertical" />

      {/* Ant Design Menu component for the sidebar */}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
        {/* Mapping through custom menu items and creating Menu.Items with NavLink */}
        {custom___MenuItems.map((item) => (
          <Menu.Item key={item.path} icon={item.icon}>
            {/* NavLink for navigation and styling of active link */}
            <NavLink to={item.path}>{item.label}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
