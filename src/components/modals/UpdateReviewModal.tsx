import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { IReview } from "@/types/global";
import { useUpdateReviewMutation } from "@/redux/features/product-review/productReviewApi";

interface UpdateReviewModalProps {
  review: IReview;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ReviewUpdateData {
  rating: number;
  comment: string;
}

const UpdateReviewModal = ({ 
  review, 
  isOpen, 
  onOpenChange 
}: UpdateReviewModalProps) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [updateReview] = useUpdateReviewMutation();

  useEffect(() => {
    if (isOpen) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [isOpen, review]);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleUpdateReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    const reviewData: ReviewUpdateData = {
      rating,
      comment,
    };

    try {
      const result = await updateReview({payload: reviewData, id: review.id}).unwrap();
      console.log(result);
      
      if (result.success === true) {
        onOpenChange(false);
        setRating(0);
        setComment("");
        toast.success("Review updated successfully!");
      }
    } catch (err: any) {
      toast.error(err.data.message || "Failed to update review");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => handleStarClick(star)}
                className={`cursor-pointer ${
                  star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
                size={32}
              />
            ))}
          </div>
          
          <p className="text-center text-muted-foreground">
            {rating > 0 
              ? `You rated this ${rating} out of 5 stars` 
              : "Select your rating"}
          </p>
          
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="min-h-[100px]"
          />
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateReview} 
              disabled={rating === 0}
            >
              Update Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReviewModal;