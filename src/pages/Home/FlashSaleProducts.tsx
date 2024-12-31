import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { useGetFlashSaleProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const FlashSaleProducts = () => {
  const { data: products, isLoading } = useGetFlashSaleProductsQuery({
    limit: 4,
  });

  return (
    <div className="container mx-auto p-6 mb-12">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
              <h1 className="text-3xl font-bold text-primary mb-6">Flash Sale Products</h1>
              <p className="flex items-center space-x-3text-md font-bold">
                <span>Home</span> <MdKeyboardArrowRight size={20} />{" "}
                <span className="text-primary">Flash Sale Products</span>
              </p>
            </div>

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
