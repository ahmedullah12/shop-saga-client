import ProductCard from "@/components/product/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { ChangeEvent, useEffect, useState } from "react";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setQuery((prev) => ({ ...prev, searchTerm }));
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data: products, isLoading } = useGetAllProductsQuery(query);
  console.log(products);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-6 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        All Products
      </h1>

      <div className="flex flex-col md:flex-row justify-normal md:justify-between md:items-center mb-12 gap-4">
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-[250px] md:w-[450px] bg-transparent p-2 border-2 border-secondary rounded-md "
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.data.data.length > 0 &&
          products.data.data.map((product: IProduct) => (
            <ProductCard product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
