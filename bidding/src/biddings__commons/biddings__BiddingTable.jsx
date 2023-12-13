// In this line, importing React and necessary components from Ant Design and Redux
import React from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPostById___getPostById, productPurchaser___productPurchaser, soldProduct___soldProduct } from "../biddings__redux/biddings__slice/bidding__postSlice";

// In this line, defining a component for rendering a table of biddings
const Bidding__BiddingTable = ({ biddings, id, isSolded }) => {
  // In this line, using Redux state and dispatch hooks
  const { user } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  // In this line, defining a function to handle selling a product
  const handleSell = async (e, row) => {
    // In this line, logging the selected row
    console.log(row);

    // In this line, preparing data for the 'soldProduct' action
    const data = {
      soldTo: row.bidPlacedBy._id,
      purchasedAt: row.biddingAmount,
    };

    // In this line, dispatching actions to update the state
    await dispatch(soldProduct___soldProduct({ id, data }));
    await dispatch(getPostById___getPostById(id));
    await dispatch(productPurchaser___productPurchaser(id));
  };

  // In this line, configuring columns for the bidding table
  const columns = [
    {
      // In this line, defining a column for bidder's name
      title: "Name",
      dataIndex: "bidPlacedBy", // Use 'bidPlacedBy' as the dataIndex
      key: "fullName",
      render: (bidPlacedBy) => <h3>{bidPlacedBy?.fullName}</h3>,
    },
    {
      // In this line, defining a column for bidding amount
      title: "Bidding amount",
      dataIndex: "biddingAmount", // Use 'biddingAmount' as the dataIndex
      key: "biddingAmount",
      render: (biddingAmount) => <p>Rs. {biddingAmount}</p>,
    },
  ];

  // In this line, adding an additional 'Action' column if the user is a seller
  if (user?.role === "seller") {
    columns.push({
      // In this line, defining a column for seller's action (e.g., selling the product)
      title: "Action",
      key: "action",
      render: (row) => {
        // In this line, defining the action content
        return (
          <Button onClick={(e) => handleSell(e, row)} disabled={isSolded ? true : false}>
            Sell
          </Button>
        );
      },
    });
  }

  // In this line, returning the table component
  return <Table columns={columns} dataSource={biddings} />;
};

// In this line, exporting the Bidding__BiddingTable component
export default Bidding__BiddingTable;
