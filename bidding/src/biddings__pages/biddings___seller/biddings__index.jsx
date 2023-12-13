import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { getPostByUser___getPostByUser, RESET } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import { getCategoryByUser___getCategoryByUser } from "../../biddings__redux/biddings__slice/bidding__categprySlice";
import { getUser___getUser, sendVerificationEmail___sendVerificationEmail } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import Biddings___CategorySlider from "../../biddings__commons/biddings__CategorySlider";
import { GridComponent___GridComponent } from "../../biddings__components/biddings_ui/biddings__designs";
import Biddings___SellerProductCard from "../../biddings__components/biddings__sellerComponents/biddings__productCard";
import Biddings__AddProduct from "../../biddings__components/biddings__sellerComponents/biddings__AddProduct";
import { ShowToSeller___ShowToSeller } from "../../biddings__components/biddings__authComponents/biddings__restricts";
import Biddings___AddCategory from "../../biddings__components/biddings__sellerComponents/biddings__AddCategory";

const Seller___Dashboard = () => {
  const [open, setOpen] = useState(false); // State to control the Add Product drawer
  const { posts } = useSelector((state) => state.post___post); // Get post data from Redux store
  const { categories } = useSelector((state) => state.categories___categories); // Get category data from Redux store
  const { user, is___Loading } = useSelector((state) => state.auth___auth); // Get user data and loading status from Redux store

  const [list, setList] = useState([]); // State to store a filtered list of posts

  // Function to show the Add Product drawer
  const showDrawer = () => {
    setOpen(true);
  };

  // Function to close the Add Product drawer
  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch(); // Get the dispatch function for Redux actions

  // Function to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPostByUser___getPostByUser()); // Get posts by the current user
      await dispatch(getCategoryByUser___getCategoryByUser()); // Get categories by the current user
      dispatch(getUser___getUser()); // Get user data
      dispatch(RESET()); // Reset Redux state
    };

    fetchData();
  }, [dispatch]);

  // Update the list of posts when the 'posts' state changes
  useEffect(() => {
    setList(posts);
  }, [posts]);

  // Function to filter items based on selected category
  const filterItems = (e, category) => {
    if (category === "all") {
      setList(posts);
      return;
    }
    const newPosts = posts.filter((item) => item.category.slug === category);

    setList(newPosts);
  };

  // Function to handle the verification button click
  const handleVerifyClicked = async () => {
    await dispatch(sendVerificationEmail___sendVerificationEmail()); // Send a verification email
  };

  ////function for opening the category add model
  const [categoryOpen, setCategoryOpen] = useState(false);

  ////for categorymodel
  const showCategoryDrawer = () => {
    setCategoryOpen(true);
  };

  const onCategoryClose = () => {
    setCategoryOpen(false);
  };

  return (
    <>
      <div className="mb-10">
        {/* Display a message if the user's email is not verified */}
        {!user?.isEmailVerified && (
          <div className="bg-white rounded-md p-2 my-3">
            Your account is not verified. Please {/* Display a button that triggers the handleVerifyClicked function */}
            <Button onClick={handleVerifyClicked} loading={is___Loading}>
              Click here
            </Button>{" "}
            verify your account
          </div>
        )}

        {/* Container for a button to add a product for sale */}
        <div className="flex justify-between w-full mt-3">
          <Button variant="gradient" color="green" className="flex items-center gap-3" onClick={showDrawer}>
            {/* SVG icon for adding a product */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Product for Sale
          </Button>
          <ShowToSeller___ShowToSeller>
            <Button onClick={showCategoryDrawer}>Add Category</Button>
          </ShowToSeller___ShowToSeller>
        </div>

        {/* Horizontal line as a separator */}
        <hr className="w-full mt-10" />
        <div className="flex gap-3">
          {/* Container for a category slider */}
          <div className="mt-5 relative">
            <Biddings___CategorySlider categories={categories} filterItems={filterItems} />
          </div>

          {/* Container for displaying a list of products in a grid layout */}
          <div className="products-container m-auto mt-5">
            <GridComponent___GridComponent col="grid-cols-3" gap={3}>
              {/* Map through the 'list' array and render SellerProductCard for each product */}
              {list.map((product, index) => {
                return <Biddings___SellerProductCard item={product} />;
              })}
            </GridComponent___GridComponent>

            {/* Display an 'Empty' component if the 'list' is empty */}
            {list.length <= 0 && <Empty />}
          </div>
        </div>

        {/* Add Product drawer */}
        {/* This is likely a component named 'AddProduct' that is shown when 'open' is true */}
        <Biddings__AddProduct onClose={onClose} open={open} />
        <Biddings___AddCategory onClose={onCategoryClose} open={categoryOpen} />
      </div>
    </>
  );
};

export default Seller___Dashboard;
