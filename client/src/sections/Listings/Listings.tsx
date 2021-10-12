import { server } from "../../lib/api";

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

export default function Listings({ title }: Props) {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS });
    console.log(data);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  );
}
