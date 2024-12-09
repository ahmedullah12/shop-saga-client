import ProductCard from "@/components/product/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/global";

const RecentViewedProducts = () => {
    const recentProducts = useAppSelector(state => state.recentProducts.products)

  return (
    <div className="container mx-auto p-6 mb-12">
    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
      Recently Viewed Products
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recentProducts?.length > 0 ?
        recentProducts?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        )) : (
            <p>You haven't viewed any products yet.</p>
        )}
    </div>

    
  </div>
  );
};

export default RecentViewedProducts;