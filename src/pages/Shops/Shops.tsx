import Loader from "@/components/Loader";
import ShopCard from "@/components/ShopCard";
import { useGetActiveShopsQuery } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/global";

const Shops = () => {
  const { data: shopsData, isLoading } = useGetActiveShopsQuery({});

  if (isLoading) return <Loader />;

  const shops = shopsData?.data?.data || [];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-primary mb-6">All Shops</h1>
      <div className="grid grid-cols-2  md:grid-cols-4 gap-6">
        {shops.map((shop: IShop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default Shops;
