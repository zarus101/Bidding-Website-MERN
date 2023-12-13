// Importing necessary dependencies from React and Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser___getUser } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import Biddings___MainNavbar from "../../biddings__commons/biddings__Navbar";

// Functional component for the Seller Layout
export const SellerLayout = ({ children }) => {
  // Accessing the Redux store to get the user's authentication status and details
  const { is___LoggedIn, user } = useSelector((state) => state.auth___auth);

  // Accessing the Redux store's dispatch function
  const dispatch = useDispatch();

  // useEffect hook to fetch user details when the component mounts
  useEffect(() => {
    // Dispatching the action to get user details
    dispatch(getUser___getUser());
  }, [dispatch]);

  // Checking if the user is logged in and has the role of a seller
  if (is___LoggedIn && user?.role === "seller") {
    return (
      <>
        {/* Rendering the main navigation bar */}
        <Biddings___MainNavbar />
        
        {/* Main content container with padding at the top */}
        <div className="containers py-10">
          {/* Rendering the children components passed to SellerLayout */}
          {children}
        </div>

      </>
    );
  }

  // Returning a message for unauthorized users
  return "not authorized";
};
