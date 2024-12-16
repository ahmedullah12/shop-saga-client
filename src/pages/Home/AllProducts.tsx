import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import { FilterIcon } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Loader from "@/components/Loader";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState<Record<string, any>>({
    page: 1,
    limit: 8,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: productData, isLoading: productsLoading } =
    useGetAllProductsQuery(query, {
      skip: !hasMore,
    });

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery({});
    
  // Update products when new data arrives
  useEffect(() => {
    if (productData?.data?.data) {
      setProducts((prevProducts) => {
        const newProducts = productData.data.data;

        // Check if we've reached the end of results
        if (newProducts.length === 0) {
          setHasMore(false);
        }

        // Prevent duplicate products
        const uniqueNewProducts = newProducts.filter(
          (newProduct: IProduct) =>
            !prevProducts.some((p) => p.id === newProduct.id)
        );

        return [...prevProducts, ...uniqueNewProducts];
      });
      setIsLoading(false);
    }
  }, [productData]);



  // Handle search params for category
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  // Debounced search term update
  useEffect(() => {
    const timerId = setTimeout(() => {
      // Reset products and pagination when search term changes
      setProducts([]);
      setQuery((prev) => ({
        ...prev,
        searchTerm,
        page: 1,
      }));
      setHasMore(true);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight - 100 && // Added buffer
      !isLoading &&
      hasMore
    ) {
      setQuery((prev) => ({
        ...prev,
        page: (prev.page || 1) + 1,
      }));
      setIsLoading(true);
    }
  }, [isLoading, hasMore]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Update query when filters change
  useEffect(() => {
    // Reset products when filters change
    setProducts([]);
    setQuery((prev) => ({
      ...prev,
      price: priceRange,
      category: category,
      page: 1,
    }));
    setHasMore(true);
  }, [priceRange, category]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setPriceRange("");
    setCategory("");
    setProducts([]);
    setQuery({ page: 1, limit: 10 });
    setHasMore(true);
    navigate("/all-products");
  };

  // Loading states
  if (categoriesLoading && productsLoading) return <Loader />;

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
        {products.length > 0 ? (
          products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products to show...</p>
        )}
      </div>

      {isLoading && <Loader />}
      {!hasMore && products.length > 0 && (
        <p className="text-center mt-4 text-gray-500">
          No more products to load
        </p>
      )}
    </div>
  );
};

export default AllProducts;
