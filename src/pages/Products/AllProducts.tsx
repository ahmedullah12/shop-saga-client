import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/product/ProductCard";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/global";
import Pagination from "@/components/Pagination";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { MdKeyboardArrowRight } from "react-icons/md";

const PRICE_RANGES = [
  { value: "0-50", label: "$0-$50" },
  { value: "50-100", label: "$50-$100" },
  { value: "100-200", label: "$100-$200" },
  { value: "200-400", label: "$200-$400" },
  { value: "400-", label: "$400+" },
];

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const dataPerPage = 8;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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
      setCurrentPage(1);
    }

    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) {
      setSearchTerm(searchTerm);
      setCurrentPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, category]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (value: string) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
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
    <div
      className="container mx-auto px-2 py-4 md:p-6 mb-12">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Products</h1>
        <p className="flex items-center space-x-3text-md font-bold">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <MdKeyboardArrowRight size={20} />{" "}
          <span className="text-primary">Products</span>
        </p>
      </div>
      <div className="flex justify-between ">
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
            <FilterIcon size={18} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside
          className={`w-full md:w-64 ${
            showMobileFilters ? "block" : "hidden"
          } md:block`}
        >
          <div className="bg-accent p-4 rounded-lg sticky top-32">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Select value={priceRange} onValueChange={handlePriceChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICE_RANGES.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.data?.data?.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                {productData?.data?.data?.length > 0 ? (
                  productData?.data?.data?.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p>No products found...</p>
                )}
              </div>

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
