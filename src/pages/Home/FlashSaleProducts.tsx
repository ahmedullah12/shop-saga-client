import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useGetFlashSaleProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { Link } from "react-router-dom";

const FlashSaleProducts = () => {
  const { data: products, isLoading } = useGetFlashSaleProductsQuery(undefined);
  
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-6 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        Flash Sale Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.data.length > 0 &&
          products?.data?.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      <div className="flex justify-center mt-5">
        <Link to={"/products/flash-sale"}>
          <Button size={"default"}>All Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
