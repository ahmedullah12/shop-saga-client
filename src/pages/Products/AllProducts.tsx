import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import Pagination from "@/components/Pagination";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const dataPerPage = 8;

  const [searchParams] = useSearchParams();

  // Use debounced search term to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Query with all filter parameters
  const { data: productData, isLoading: productsLoading } =
    useGetAllProductsQuery({
      searchTerm: debouncedSearchTerm,
      price: priceRange,
      category,
      page: currentPage,
      limit: dataPerPage,
    });

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery({});

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
      setCurrentPage(1); // Reset page when category is set from URL
    }
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, category]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleClearFilters = () => {
    setPriceRange("");
    setCategory("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const meta = productData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <div className="container mx-auto p-6 mb-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        All Products
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-[300px] md:w-[400px] bg-transparent p-2 border-2 border-secondary rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Mobile Filters Toggle */}
      <div className="md:hidden mb-4">
        <Button
          className="bg-primary space-x-1 hover:bg-secondary w-full"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <span>{showMobileFilters ? "Hide Filters" : "Show Filters"}</span>
          <FilterIcon size={18} />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters - Hidden on mobile unless toggled */}
        <aside
          className={`w-full md:w-64 ${
            showMobileFilters ? "block" : "hidden"
          } md:block`}
        >
          <div className="bg-accent p-4 rounded-lg sticky top-24">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <select
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Prices</option>
                  <option value="0-50">$0-$50</option>
                  <option value="50-100">$50-$100</option>
                  <option value="100-200">$100-$200</option>
                  <option value="200-400">$200-$400</option>
                  <option value="400-">$400+</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border rounded-md "
                >
                  <option value="">All Categories</option>
                  {categories?.data?.data?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {(priceRange || category || searchTerm) && (
                <Button
                  onClick={handleClearFilters}
                  className="w-full bg-primary hover:bg-secondary"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {categoriesLoading || productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {productData?.data?.data?.map((product: IProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {meta?.total > dataPerPage && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProducts;
