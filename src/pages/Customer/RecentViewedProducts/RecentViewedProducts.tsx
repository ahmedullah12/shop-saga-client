import ProductCard from "@/components/product/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/global";
import { MdKeyboardArrowRight } from "react-icons/md";

const RecentViewedProducts = () => {
  const recentProducts = useAppSelector(
    (state) => state.recentProducts.products
  );

  return (
    <div className="container mx-auto p-6 mb-12">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Recent Viewed Products
        </h1>
        <p className="flex items-center space-x-3text-md font-bold">
          <span>Home</span> <MdKeyboardArrowRight size={20} />{" "}
          <span className="text-primary">Recent Viewed Products</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentProducts?.length > 0 ? (
          recentProducts?.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>You haven't viewed any products yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecentViewedProducts;
