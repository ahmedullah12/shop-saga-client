import Loader from "@/components/Loader";
import { useGetShopProductsReviewsQuery } from "@/redux/features/product-review/productReviewApi";
import { useGetUserShopQuery } from "@/redux/features/shop/shopApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { IReview } from "@/types/global";
import { Link } from "react-router-dom";
import ReviewComment from "@/components/ReviewComment";
import ReplyReviewModal from "@/components/modals/ReplyReviewModal";
import { useState } from "react";
import Pagination from "@/components/Pagination";

const ShopProductsReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;

  const { data: shopData, isLoading } = useGetUserShopQuery(undefined);

  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetShopProductsReviewsQuery({
      shopId: shopData?.data.id,
      limit: dataPerPage,
      page: currentPage,
    });

  if (isLoading || reviewsLoading) return <Loader />;

  const reviews = reviewsData?.data?.data;
  const meta = reviewsData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary">
            My Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews && reviews.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews?.map((review: IReview) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium hover:underline">
                      <Link to={`/products/${review.product.id}`}>
                        {review.product.name}
                      </Link>
                    </TableCell>
                    <TableCell>{review.user.name}</TableCell>
                    <TableCell>{renderStarRating(review.rating)}</TableCell>
                    <TableCell>
                      <ReviewComment comment={review.comment} />
                    </TableCell>
                    <TableCell>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <ReplyReviewModal
                        reviewId={review.id}
                        username={review.user.name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No reviews found
            </div>
          )}
        </CardContent>
      </Card>

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

export default ShopProductsReviews;
