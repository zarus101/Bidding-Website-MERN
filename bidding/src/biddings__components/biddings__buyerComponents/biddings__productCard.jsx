// Importing necessary components from Ant Design and React
import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

// Functional component for rendering a buyer product card
const Biddings__BuyerProductCard = ({ item }) => {
  return (
    // Main container for the product card with styling
    <Card
      hoverable
      className="rounded-lg shadow-md mb-4 cursor-pointer"
      cover={<img alt="product" src={item.image.filePath} className="rounded-t-lg h-[400px] object-cover" />}
    >
      {/* Section for displaying user information */}
      <div className="flex items-center mb-4">
        {/* User profile image */}
        <img src={item.image.filePath} alt="user" className="w-10 h-10 rounded-full mr-4" />
        <div>
          {/* User's name */}
          <p className="text-lg font-semibold">{item.postedBy.fullName}</p>
          {/* Time since the post was made */}
          <p className="text-gray-500">Posted at {item?.createdAt}</p>
        </div>
      </div>

      {/* Main content section */}
      <div className=" overflow-hidden">
        {/* Link to the detailed product page */}
        <Link to={`/buyer/product/${item?.postedBy?.fullName}/${item.postedItemName}/${item?._id}`}>
          {/* Product name */}
          <h2 className="text-xl font-semibold">{item.postedItemName}</h2>
        </Link>
        {/* Product description */}
        <p className="text-gray-700">{item.description}</p>
      </div>

      {/* Section for displaying product status */}
      <div className="absolute top-5 right-4">
        {/* Displaying "Sold Out" if the product is sold */}
        {item.isSolded && (
          <Button danger type="primary">
            Sold Out
          </Button>
        )}

        {/* Displaying "Bidding ongoing" if the product is not sold */}
        {!item.isSolded && (
          <Button type="primary" className="bg-green-600">
            Bidding ongoing
          </Button>
        )}
      </div>
    </Card>
  );
};

// Exporting the BuyerProductCard component
export default Biddings__BuyerProductCard;
