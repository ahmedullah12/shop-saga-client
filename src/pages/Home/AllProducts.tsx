import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { FilterIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "@/components/Loader";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

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

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setPriceRange("");
    setCategory("");
    navigate("/all-products");
  };

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      price: priceRange,
      category: category,
    }));
  }, [priceRange, category]);

  const { data: products, isLoading } = useGetAllProductsQuery(query);

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(undefined);

  if (isLoading && categoriesLoading) return <Loader/>;

  return (
    <div className="container mx-auto p-6 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        All Products
      </h1>

      <div className="flex flex-col md:flex-row justify-normal md:justify-between md:items-center mb-12 gap-4">
        <input
          type="text"
          placeholder="Search rooms..."
          className="w-[250px] md:w-[450px] bg-transparent p-2 border-2 border-secondary rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="relative">
          <Button
            className="bg-primary space-x-1 hover:bg-secondary"
            onClick={handleToggleFilters}
          >
            <span>Filters</span>
            <FilterIcon size={18} />
          </Button>
          {showFilters && (
            <ProductFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              handleClear={handleClearFilters}
              categories={categories?.data}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.data?.data.length > 0 ? (
          products?.data?.data.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products to show...</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
