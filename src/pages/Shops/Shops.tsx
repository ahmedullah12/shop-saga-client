import ShopCard from "@/components/ShopCard";
import ShopCardSkeleton from "@/components/ShopCardSkeleton";
import { useGetActiveShopsQuery } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/global";

const Shops = () => {
  const { data: shopsData, isLoading } = useGetActiveShopsQuery({});

  const shops = shopsData?.data?.data || [];

  return (
    <div className="container mx-auto py-6 mb-10">
      <h1 className="text-3xl font-bold text-primary mb-6">All Shops</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <ShopCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-4 gap-6">
          {shops.map((shop: IShop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shops;
