import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/global";
import formatDate from "@/utils/formatDate";
import CreateCategoryModal from "@/components/modals/CreateCategoryModal";
import UpdateCategoryModal from "@/components/modals/UpdateCategoryModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const { data: categoriesData, isLoading } =
    useGetAllCategoriesQuery({limit: dataPerPage, page: currentPage});

    const [deleteCategory] = useDeleteCategoryMutation();

  const handleOpenDeleteModal = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      return deleteCategory(selectedCategory.id).unwrap();
    }
  };

  if (isLoading) return <Loader />;

  const categories = categoriesData?.data?.data || [];
  const meta = categoriesData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <div className="w-full p-6 bg-white shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
        <CreateCategoryModal />
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No categories found</p>
          <p className="text-sm">Start by adding category</p>
        </div>
      ) : (
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: ICategory) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>

                <TableCell>{formatDate(category.createdAt)}</TableCell>
                <TableCell className="md:space-x-4">
                  <UpdateCategoryModal category={category} />
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                    onClick={() => handleOpenDeleteModal(category)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={handleDeleteCategory}
        title="Delete User"
        description="Are you sure you want to delete this category?"
      />

      {meta?.total > dataPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Categories;
