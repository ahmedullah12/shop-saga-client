import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { useGetFlashSaleProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { Link } from "react-router-dom";

const FlashSaleProducts = () => {
  const { data: products, isLoading } = useGetFlashSaleProductsQuery({
    limit: 4,
  });

  return (
    <div className="container px-1 md:px-0 pb-6 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        Flash Sale Products
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
            <Link to={"/flash-sale-products"}>
              <Button size={"default"}>All Flash Sale</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashSaleProducts;
