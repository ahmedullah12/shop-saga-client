import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { Link } from "react-router-dom";

const RecentProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 4,
  });

  return (
    <div className="container mx-auto my-10 px-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        Recent Products
      </h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products?.data?.data?.length > 0 &&
              products?.data?.data?.map((product: IProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="flex justify-center mt-5">
            <Link to={"/products"}>
              <Button size={"default"}>All Products</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProducts;
