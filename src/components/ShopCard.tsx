import { IShop } from "@/types/global";
import { Link } from "react-router-dom";

const ShopCard = ({ shop }: { shop: IShop }) => {
  return (
    <div
      className="p-6 border rounded-lg shadow-md bg-white"
    >
      <img
        src={shop.logoUrl}
        alt={`${shop.name} Logo`}
        className="w-24 h-24 object-cover rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{shop.name}</h2>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Joined:</strong> {new Date(shop.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <strong>Total Products:</strong> {shop?.products?.length}
      </p>
      <Link to={`/shop/${shop.id}`}>
        <button className="px-4 py-2 text-sm text-white bg-primary rounded hover:bg-secondary">
          See Details
        </button>
      </Link>
    </div>
  );
};

export default ShopCard;
