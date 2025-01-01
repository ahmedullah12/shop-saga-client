import { ICategory } from "@/types/global";
import { Link } from "react-router-dom";

const MegaMenu = ({
  categories,
}: {
  categories: { data: { data: ICategory[] } };
}) => {
  return (
    <div className="absolute top-10 left-0 w-[50vw] bg-white shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 border-t">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-4 gap-3">
          {categories?.data?.data?.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-primary hover:text-primary/80 font-medium">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
