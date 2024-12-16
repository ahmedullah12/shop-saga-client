import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [query, setQuery] = useState<Record<string, any>>({
    page: 1,
    limit: 4,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams] = useSearchParams();

  const {
    data: productData,
    isLoading: productsLoading,
    isFetching,
  } = useGetAllProductsQuery(query);

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery({});

  useEffect(() => {
    if (productData?.data?.data) {
      const newProducts = productData.data.data;

      if (query.page === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => {
          const uniqueNewProducts = newProducts.filter(
            (newProduct: IProduct) =>
              !prevProducts.some((p) => p.id === newProduct.id)
          );
          return [...prevProducts, ...uniqueNewProducts];
        });
      }

      setHasMore(newProducts.length > 0);
    }
  }, [productData, query.page]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const timerId = setTimeout(() => {
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

  useEffect(() => {
    setProducts([]);
    setQuery((prev) => ({
      ...prev,
      price: priceRange,
      category: category,
      page: 1,
    }));
    setHasMore(true);
  }, [priceRange, category]);

  const fetchMoreData = () => {
    setQuery((prev) => ({
      ...prev,
      page: (prev.page || 1) + 1,
    }));
  };

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
    setQuery({ page: 1, limit: 8 });
    setHasMore(true);
  };

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
              categories={categories?.data?.data}
            />
          )}
        </div>
      </div>

      {(categoriesLoading || productsLoading || isFetching) && <Loader />}

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          products.length > 0 && (
            <p className="text-center mt-4 text-gray-500">
              No more products to load
            </p>
          )
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!productsLoading && products.length > 0 ? (
            products.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products to show...</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllProducts;
