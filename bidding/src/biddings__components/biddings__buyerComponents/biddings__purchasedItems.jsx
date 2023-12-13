// Importing necessary components from the Material Tailwind library
import { List, ListItem, ListItemPrefix, Card, Typography } from "@material-tailwind/react";
// Importing a sample data array of recently purchased items
import { ItemsPurchased } from "../../assests/data";

// Functional component for displaying recently purchased items
export function Biddings__PurchasedItems() {
  return (
    // Main container for the purchased items section
    <div className="relative w-[35%]">
      {/* Card component for styling and organizing content */}
      <Card className=" sticky top-0 left-0 p-5">
        {/* Heading for the recently purchased items section */}
        <h3 className="text-[20px] font-bold">Recently Purchased</h3>
        
        {/* List component for rendering purchased items */}
        <List>
          {/* Mapping through each item in the sample data array */}
          {ItemsPurchased.map((item, index) => (
            // ListItem component for each purchased item
            <ListItem key={index}>
              {/* ListItemPrefix to display an image or icon before the content */}
              <ListItemPrefix>
                <figure className="">
                  {/* Displaying the image of the purchased item */}
                  <img src={item.image} alt="imag" className=" h-[100px] w-[100px] mobile:w-[50px]" />
                </figure>
              </ListItemPrefix>
              
              {/* Container for item details */}
              <div>
                {/* Displaying the name of the buyer */}
                <Typography variant="h6" color="blue-gray">
                  {item.purchasedBY}
                </Typography>
                
                {/* Displaying the name of the purchased item */}
                <Typography variant="small" color="gray" className="font-normal">
                  {item.name}
                </Typography>
                
                {/* Displaying the price at which the item was purchased */}
                <Typography variant="small" color="gray" className="font-bold">
                  Rs. {item.purchasedAt}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
