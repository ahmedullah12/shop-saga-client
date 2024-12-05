import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useNavigate } from "react-router-dom";
import { PackageOpen } from "lucide-react";

const Categories = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <PackageOpen size={48} className="text-orange-400" />
        </div>
      </div>
    );
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="container mx-auto p-6 mb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        Product Categories
      </h1>
      <div className="flex flex-wrap gap-4 place-items-center">
        {categories?.data.map((category: { id: string; name: string }) => (
          <div
            key={category.id}
            className="
              bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="p-2 md:p-4 flex items-center justify-between">
              <span className="text-base md:text-lg font-semibold text-primary">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;