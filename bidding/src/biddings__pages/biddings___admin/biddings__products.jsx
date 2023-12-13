// Importing necessary dependencies and components
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost___getAllPost, RESET } from '../../biddings__redux/biddings__slice/bidding__postSlice';
import ProductList___ProductList from '../../biddings__components/biddings__adminComponents/biddings__productLists';

// Products component for displaying a list of products in the admin section
const Biddings__Products = () => {
    // Redux state and dispatch setup
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post___post);
  
    // I've added an effect to fetch all posts when the component mounts
    useEffect(() => {
      // I've created an async function to fetch data
      const fetchData = async () => {
        // Dispatching the action to get all posts
        await dispatch(getAllPost___getAllPost());
        
        // Dispatching the action to reset the post state (assuming it's used for temporary data storage)
        dispatch(RESET());
      };
  
      // Calling the fetchData function
      fetchData();
    }, [dispatch]);

    // Rendering the ProductList component with the fetched posts as a prop
    return (
        <>
            <ProductList___ProductList users={posts} />
        </>
    )
}

// Exporting the Products component
export default Biddings__Products
