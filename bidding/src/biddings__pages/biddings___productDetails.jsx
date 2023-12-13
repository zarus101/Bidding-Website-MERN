// Importing necessary React and Redux-related dependencies, as well as components and styles from external libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, Breadcrumbs, Button } from "@material-tailwind/react";
import {
  getPostById___getPostById,
  productPurchaser___productPurchaser
} from "../biddings__redux/biddings__slice/bidding__postSlice";
import {
  ShowToBuyer___ShowToBuyer,
  ShowToSeller___ShowToSeller
} from "../biddings__components/biddings__authComponents/biddings__restricts";
import { Bidding__BiddingDialog } from "../biddings__components/biddings__buyerComponents/biddings__biddingDialogue";
import Biddings__EditProduct from "../biddings__components/biddings__sellerComponents/biddings__EditProduct";
import Bidding__BiddingTable from "../biddings__commons/biddings__BiddingTable";
import { ProductHeading___ProductHeading } from "../biddings__components/biddings_ui/biddings__Titles";

// Functional component for displaying detailed information about a product in the bidding system
const Biddings__ProductDetails = () => {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();

  // Retrieving data from the Redux store using the useSelector hook
  const { single___Post, purchaser } = useSelector((state) => state.post___post);
  const dispatch = useDispatch();

  // Effect to fetch the selected post by its ID when the component mounts or 'id' changes
  useEffect(() => {
    dispatch(getPostById___getPostById(id));
  }, [dispatch, id]);

  // Effect to fetch information about the product's purchaser when 'id' changes
  useEffect(() => {
    dispatch(productPurchaser___productPurchaser(id));
  }, [id, dispatch]);

  // State and functions to manage the bidding dialog's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(id);

  const showModal = (e, id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // State and functions to manage the product edit drawer's visibility
  const [editOpen, setEditOpen] = useState(false);

  const showEditDrawer = (e, id) => {
    setSelectedId(id);
    setEditOpen(true);
  };

  const onEditClose = () => {
    setEditOpen(false);
  };

  // Logging the details of the selected post to the console
  console.log(single___Post, "this is single post");



  // JSX structure representing the component's UI
  return (
    <>
      <section className="">
        {/* Breadcrumbs for navigation, visible only to sellers */}
        <ShowToSeller___ShowToSeller>
          <div className="breadcrumps ">
            <Breadcrumbs>
              <Link to={"/seller/dashboard"}>Home</Link>
              <Link>{single___Post?.postedItemName}</Link>
            </Breadcrumbs>
          </div>
        </ShowToSeller___ShowToSeller>

        {/* Header section with product name, status, and edit button */}
        <div className="headings flex justify-between mt-10 py-3">
          <ProductHeading___ProductHeading text={single___Post?.postedItemName} />
          <div className="flex gap-3">
            {/* Displaying product status (Solded/Ongoing) */}
            {single___Post?.isSolded ? (
              <div className="bg-black rounded-md p-2 text-white font-bold flex justify-center items-center text-center">Solded</div>
            ) : (
              <div className="bg-gray-400 rounded-md p-2 text-black font-bold flex justify-center items-center text-center">Ongoing</div>
            )}

            {/* Edit button, visible only to sellers */}
            <ShowToSeller___ShowToSeller>
              <Button color="green" onClick={(e) => showEditDrawer(e, single___Post?._id)}>
                Edit
              </Button>
            </ShowToSeller___ShowToSeller>
          </div>
        </div>

        {/* Horizontal line separator */}
        <hr className="bg-gray-200 w-full mb-3" />

        {/* Grid layout with product image and details */}
        <div >
          {/* Product image */}
          <div className="product-image w-full flex">
            <figure className="h-[600px] w-full shadow-md  bg-white rounded-none rounded-tl-md rounded-tr-md  p-5">
              <img src={single___Post?.image?.filePath} alt="img" className="h-full w-full object-cover" />
            </figure>
          </div>

          {/* Product details */}
          <div className=" flex justify-start flex-col gap-3 bg-white shadow-md rounded-none rounded-bl-md rounded-br-md p-3">
            {/* Product description */}
            <div className="description w-full overflow-hidden">
              <p>{single___Post?.description}</p>
            </div>
            <br />

            {/* Posted by information */}
            <div className="postedBY text-[20px] gap-3 flex flex-col  font-bold">
              <h3>Posted By:</h3>
              <div className="flex gap-2  text-center align-middle">
                <Avatar src={single___Post?.image?.filePath} />
                {single___Post?.postedBy?.fullName}
              </div>
            </div>

            {/* Starting price of the product */}
            <div className="price text-white text-[20px] font-bold">
              <h2>Starting Price: {single___Post?.initialPrice}</h2>
            </div>

            {/* Biddings table */}
            <div className="bidddings px-2 bg-white mt-10 ">
              <h3 className="font-bold text-gray-700 text-[20px] mb-2">Biddings:</h3>
              <Bidding__BiddingTable biddings={single___Post?.biddings} id={id} isSolded={single___Post?.isSolded} />
            </div>

            {/* Place Bid button, visible only to buyers */}
            <ShowToBuyer___ShowToBuyer>
              <div className="button">
                <Button disabled={single___Post?.isSolded ? true : false} color="green" onClick={(e) => showModal(e, single___Post._id)}>
                  Place your Bid
                </Button>
              </div>
            </ShowToBuyer___ShowToBuyer>

            {/* Displaying information about the purchaser if the product is sold */}
            {single___Post?.isSolded && (
              <div className="p-3 bg-green-300 rounded-md mb-10">
                <h3>
                  This product has been sold to <span className="text-white font-bold">{purchaser?.soldTo?.fullName}</span> at <span className="text-red-400 font-bold">Rs {purchaser?.purchasedAt}</span>{" "}
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* Bidding dialog, visible only to buyers */}
        <ShowToBuyer___ShowToBuyer>
          <Bidding__BiddingDialog handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} id={selectedId} setIsModalOpen={setIsModalOpen} />
        </ShowToBuyer___ShowToBuyer>

        {/* Product edit drawer, visible only to sellers */}
        <ShowToSeller___ShowToSeller>
          <Biddings__EditProduct onClose={onEditClose} open={editOpen} id={selectedId} />
        </ShowToSeller___ShowToSeller>
      </section>
    </>
  );
};

// Exporting the component as the default export
export default Biddings__ProductDetails;
