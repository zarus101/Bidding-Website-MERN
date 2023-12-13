// Importing necessary dependencies from Material Tailwind
import { List, ListItem, Typography } from "@material-tailwind/react";

// BiddingLists component for displaying a list of bids
export function Biddings__BiddingLists({ biddings }) {
  return (
    <div className="w-96">
      {/* Using Material Tailwind List component */}
      <List className="">
        {/* Mapping through the list of bids and rendering each bid as a ListItem */}
        {biddings?.biddings?.map((bid, index) => {
          return (
            <ListItem className="justify-between">
              <div className="flex">
                {/* Displaying bid details */}
                <div>
                  {/* Displaying the full name of the bidder */}
                  <Typography variant="h6" color="blue-gray">
                    {bid.bidPlacedBy.fullName}
                  </Typography>
                  {/* Displaying the bidding amount in bold */}
                  <Typography variant="h6" color="gray" className="font-bold">
                    Amount: <span className="font-bold">Rs.{bid.biddingAmount}</span>
                  </Typography>
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
