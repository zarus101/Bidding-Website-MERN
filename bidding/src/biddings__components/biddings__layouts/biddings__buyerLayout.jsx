// Importing necessary dependencies and components
import { useSelector } from "react-redux";
import Biddings___MainNavbar from "../../biddings__commons/biddings__Navbar";

// Functional component for the Buyer Layout
export const Biddings___BuyerLayout = ({ children }) => {
  // Extracting isLoggedIn state from the Redux store
  const { is___LoggedIn } = useSelector((state) => state.auth___auth);

  // Logging the value of isLoggedIn to the console
  console.log(is___LoggedIn);

  // Logging the value of isLoggedIn with a message
  console.log(is___LoggedIn, "lodfsdfsfsfsfsd");

  // Checking if the user is logged in
  if (is___LoggedIn) {
    return (
      <>
        {/* Rendering the MainNavbar component for navigation */}
        <Biddings___MainNavbar/>
        {/* Main content container for the Buyer Layout */}
        <div className="containers">
          {/* Rendering the children components passed to BuyerLayout */}
          <div>{children}</div>
        </div>
      </>
    );
  }

  // If the user is not logged in, return a message indicating not authorized
  return "not authorized";
};
