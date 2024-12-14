import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateReviewMutation } from "@/redux/features/product-review/productReviewApi";

interface ReviewModalProps {
  productId: string;
  productName: string;
}

interface ReviewSubmissionData {
  productId: string;
  rating: number;
  comment: string;
}

const CreateReviewModal = ({ productId, productName }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [createReview] = useCreateReviewMutation();

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment) {
      toast.error("Please write comment");
      return;
    }

    const reviewData: ReviewSubmissionData = {
      productId,
      rating,
      comment,
    };

    try {
      const result = await createReview(reviewData).unwrap();
      if (result.success === true) {
        setIsOpen(false);
        setRating(0);
        setComment("");
        toast.success("Review submitted successfully!");
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Leave Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {productName}</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center space-x-2 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer ${
                star <= rating
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300"
              }`}
              onClick={() => handleStarClick(star)}
              size={32}
            />
          ))}
        </div>

        <div className="text-center mb-2">
          <p className="text-sm text-gray-600">
            {rating > 0
              ? `You rated this ${rating} out of 5 stars`
              : "Select your rating"}
          </p>
        </div>

        <Textarea
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitReview} disabled={rating === 0}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReviewModal;
