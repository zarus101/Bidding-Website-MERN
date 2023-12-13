// In this line: Importing necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Empty, Input } from "antd";
import { getAllPost___getAllPost } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import { getUser___getUser, sendVerificationEmail___sendVerificationEmail } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import { GridComponent___GridComponent } from "../../biddings__components/biddings_ui/biddings__designs";
import Biddings__BuyerProductCard from "../../biddings__components/biddings__buyerComponents/biddings__productCard";
import { Bidding__BiddingDialog } from "../../biddings__components/biddings__buyerComponents/biddings__biddingDialogue";

// In this line: Home component for the buyer
const Home___Home = () => {

  // In this line: State for controlling the bidding dialog visibility and search parameters
  const [bidOpen, setBidOpen] = useState(false);
  const [params, setParams] = useState({
    search: "",
    verified: true,
  });

  // In this line: Function to toggle the visibility of the bidding dialog
  const handleBidOpen = () => setBidOpen((cur) => !cur);

  // In this line: Redux state and dispatch setup
  const { posts } = useSelector((state) => state.post___post);
  const { user, is___Loading } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  // In this line: Fetching all posts based on the search parameters
  useEffect(() => {
    // In this line: I've added a comment for the useEffect hook explaining its purpose
    const fetchData = async () => {
      // In this line: Dispatching the action to get all posts with the specified parameters
      await dispatch(getAllPost___getAllPost(params));
    };

    // In this line: Calling the fetchData function when the component mounts or when search parameters change
    fetchData();
  }, [dispatch, params]);

  // In this line: Fetching user data when the component mounts
  useEffect(() => {
    // In this line: Dispatching the action to get the current user data
    dispatch(getUser___getUser());
  }, [dispatch]);

  // In this line: Function for handling the verification button click
  const handleVerifyClicked = async () => {
    // In this line: Dispatching the action to send a verification email
    await dispatch(sendVerificationEmail___sendVerificationEmail());
  };

  // In this line: Rendering the JSX content
  return (
    <>
      {/* In this line: Displaying a message if the user's email is not verified */}
      <div className="gap-[2%] relative mt-10">
        {!user?.isEmailVerified && (
          <div className="bg-red-300 rounded-md p-2 mb-3 text-white">
            Your account is not verified. Please{" "}
            <Button onClick={handleVerifyClicked} loading={is___Loading}>
              Click here
            </Button>{" "}
            to verify your account.
          </div>
        )}

        {/* In this line: Displaying a welcome message and search input */}
        <div className="flex w-full mb-5 justify-between">
          <div className="bg-white  px-3 py-1 rounded-md text-[20px]">
            <h3>
              Welcome <span className=" font-semibold capitalize">{user?.fullName}</span>
            </h3>
          </div>
          <div className="w-[30%] flex mobile:w-full gap-3 items-center text-center">
            <h6 className="text-white font-bold">Search:</h6>
            {/* In this line: Input for searching products */}
            <Input placeholder="Input search text" value={params?.search} onChange={(e) => setParams({ search: e.target.value })}  className="px-2 py-2"/>
          </div>
        </div>

        {/* In this line: Horizontal line separator */}
        <hr className="w-full mb-10" />

        {/* In this line: Displaying the grid of products and an empty state if there are no posts */}
        <div class="w-full">
          {/* In this line: Grid component for displaying products */}
          <GridComponent___GridComponent col={"grid-cols-3"} gap={3} className="products-container">
            {posts
              ?.filter((item) => item.isPostVerified)
              ?.map((item, index) => {
                // In this line: Product card component for displaying individual products
                return <Biddings__BuyerProductCard item={item} handleBidOpen={handleBidOpen} />;
              })}
          </GridComponent___GridComponent>
          {/* In this line: Displaying an empty state if there are no posts */}
          {posts.length <= 0 && <Empty />}
        </div>
      </div>

      {/* In this line: Bidding dialog component */}
      <Bidding__BiddingDialog open={bidOpen} handleOpen={handleBidOpen} />
    </>
  );
};

// In this line: Exporting the Home component
export default Home___Home;
