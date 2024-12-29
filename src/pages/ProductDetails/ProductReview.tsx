import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import StarRatings from "react-star-ratings";
import { format } from "date-fns";
import ReviewComment from "@/components/ReviewComment";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct, IReview } from "@/types/global";
import { Star } from "lucide-react";

const ProductReview = ({product}: {product: {data: IProduct}}) => {

    const averageRating =
    product?.data?.reviews?.reduce(
      (acc: number, review: IReview) => acc + review.rating,
      0
    ) / product?.data?.reviews?.length;

    const starRating = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`h-6 w-6 ${
              index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
            }`}
          />
        ));
      };
  return (
    <div className="mt-12">
          <Card className="w-full shadow-md">
            <h3 className="text-2xl text-secondary font-bold my-3 ms-4">
              Reviews & Ratings
            </h3>
            <div className="flex items-center gap-4 ms-10">
              <p className="text-2xl font-semibold">
                {averageRating.toFixed(1)}
              </p>
              <div>
                <StarRatings
                  rating={averageRating}
                  starRatedColor="gold"
                  starEmptyColor="gray"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                />
                <p className="text-sm text-gray-500">
                  Based on {product?.data?.reviews?.length}{" "}
                  {product?.data?.reviews?.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-4" />
            <CardContent className="p-6 md:p-8 space-y-4">
              {product?.data?.reviews.length > 0 ? (
                product.data.reviews.map((review: IReview) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex flex-col md:flex-row gap-y-4 items-start justify-between">
                      <div className="md:flex items-center md:gap-20 mb-2">
                        <div className="flex items-center gap-x-2 mb-4 md:mb-0">
                          <Avatar className="w-14 h-14">
                            {review.user.profileImage && (
                              <AvatarImage
                                className="w-full h-full"
                                src={review.user.profileImage}
                                alt={review.user.name}
                              />
                            )}
                            <AvatarFallback>
                              {review.user.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="">
                            <p className="text-md font-semibold">
                              {review.user.name}
                            </p>
                            <p>Verified Buyer </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex mr-2">
                            {starRating(review.rating)}
                          </div>
                          <ReviewComment comment={review.comment}/>
                        </div>
                      </div>
                      <div>
                        <p>{format(review.createdAt, "PPPpp")}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews to show.</p>
              )}
            </CardContent>
          </Card>
        </div>
  );
};

export default ProductReview;