import { IShop } from "@/types/global";
import { Link } from "react-router-dom";

const ShopCard = ({ shop }: { shop: IShop }) => {
  return (
    <div className="h-[300px] p-6 border rounded-lg shadow-md bg-white flex flex-col">
      <div className="flex justify-center">
        <img
          src={shop.logoUrl}
          alt={`${shop.name} Logo`}
          className="w-24 h-24 object-cover rounded-full"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2 line-clamp-1">
          {shop.name}
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Joined:</strong>{" "}
          {new Date(shop.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Total Products:</strong> {shop?.products?.length}
        </p>
      </div>
      <Link to={`/shop/${shop.id}`} className="mt-auto">
        <button className="w-full px-4 py-2 text-sm text-white bg-primary rounded hover:bg-secondary">
          See Details
        </button>
      </Link>
    </div>
  );
};

export default ShopCard;
