import Loader from "@/components/Loader";
import CreateCategoryModal from "@/components/modals/CreateCategoryModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { ICoupon } from "@/types/global";
import formatDate from "@/utils/formatDate";
import { useState } from "react";

const Coupons = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const { data: couponsData, isLoading } = useGetAllCouponsQuery({
    limit: dataPerPage,
    page: currentPage,
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleOpenDeleteModal = (coupon: ICoupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (selectedCoupon) {
      return deleteCategory(selectedCoupon.id).unwrap();
    }
  };

  if (isLoading) return <Loader />;

  const coupons = couponsData?.data?.data || [];
  const meta = couponsData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <div className="w-full p-6 bg-white shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
        <CreateCategoryModal />
      </div>

      {coupons.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No categories found</p>
          <p className="text-sm">Start by adding category</p>
        </div>
      ) : (
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons?.map((coupon: ICoupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">
                  {coupon.couponNumber}
                </TableCell>

                <TableCell>{formatDate(coupon.expiryDate)}</TableCell>
                <TableCell>{formatDate(coupon.createdAt)}</TableCell>
                <TableCell className="md:space-x-4">
                  {/* <UpdateCouponModal coupon={coupon} /> */}
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                    onClick={() => handleOpenDeleteModal(coupon)}
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
        description="Are you sure you want to delete this coupon?"
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

export default Coupons;
