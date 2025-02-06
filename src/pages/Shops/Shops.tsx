import ShopCard from "@/components/ShopCard";
import ShopCardSkeleton from "@/components/ShopCardSkeleton";
import { useGetActiveShopsQuery } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/global";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Shops = () => {
  const { data: shopsData, isLoading } = useGetActiveShopsQuery({});

  const shops = shopsData?.data?.data || [];

  return (
    <div className="container mx-auto px-2 md:px-0 py-4 md:py-6 mb-10">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Shops</h1>
        <p className="flex items-center space-x-3text-md font-bold">
        <Link to="/" className="hover:underline">Home</Link> <MdKeyboardArrowRight size={20} />{" "}
          <span className="text-primary">Shops</span>
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <ShopCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {shops.map((shop: IShop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shops;
