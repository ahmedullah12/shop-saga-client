import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2 } from "lucide-react";
import {
  useDeleteReviewMutation,
  useGetUserReviewsQuery,
} from "@/redux/features/product-review/productReviewApi";
import { IReview } from "@/types/global";
import UpdateReviewModal from "@/components/modals/UpdateReviewModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";

const UserReviews = () => {
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: reviews, isLoading } = useGetUserReviewsQuery(undefined);
  const [deleteReview] = useDeleteReviewMutation();

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 inline-block ${
          index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleOpenUpdateModal = (review: IReview) => {
    setSelectedReview(review);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModal = (review: IReview) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteReview = async () => {
    if (selectedReview) {
      return deleteReview(selectedReview.id).unwrap();
    }
  };

  if (isLoading) <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary">
            My Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews?.data && reviews.data.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.data.map((review: IReview) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium hover:underline">
                        <Link to={`/products/${review.product.id}`}>
                          {review.product.name}
                        </Link>
                      </TableCell>
                      <TableCell>{renderStarRating(review.rating)}</TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleOpenUpdateModal(review)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleOpenDeleteModal(review)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Update Review Modal */}
              {selectedReview && (
                <UpdateReviewModal
                  review={selectedReview}
                  isOpen={isUpdateModalOpen}
                  onOpenChange={setIsUpdateModalOpen}
                />
              )}
              <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onDelete={handleDeleteReview}
                title="Delete Review"
                description="Are you sure you want to delete this review? This action cannot be undone."
              />
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No reviews found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserReviews;
