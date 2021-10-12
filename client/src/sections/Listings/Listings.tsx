import { server } from "../../lib/api";
import {
  DeleteListingData,
  ListingsData,
  DeleteListingVariables,
} from "./types";

interface Props {
  title: string;
}

const LISTINGS = `
    query Listings{
        listings{
            id
            title
            image
            address
            price 
            numOfGuests
            numOfBeds
            numOfBaths
            rating
        }
    }
`;
const DELETE_LISTING = `
    mutation DeleteListing($id:ID!){
        deleteListing(id:$id){
            id
            
        }
    }
`;

export default function Listings({ title }: Props) {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "6162f81b0bd14fc7cf2d7792",
      },
    });
    console.log(data);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListing}>Delete a Listing</button>
    </div>
  );
}
