// Importing the MainNavbar component

import Biddings___MainNavbar from "../../biddings__commons/biddings__Navbar";

// Functional component for the Normal Layout
export const NormalLayout___NormalLayout = ({ children }) => {
  // Rendering the main structure for the normal layout
  return (
    <>
      {/* Rendering the MainNavbar component for navigation */}
      <Biddings___MainNavbar />
      {/* Main content container for the Normal Layout */}
      <div className="containers">
        {/* Rendering the children components passed to NormalLayout */}
        <div>{children}</div>
      </div>
    </>
  );
};
