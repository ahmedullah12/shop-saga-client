import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCreateReplyReviewMutation } from "@/redux/features/product-review/productReviewApi";
import { Input } from "../ui/input";

interface ReplyReviewModalProps {
  reviewId: string;
  username: string;
}

const ReplyReviewModal = ({ reviewId, username }: ReplyReviewModalProps) => {
  const [replyText, setReplyText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [createReplyReview] = useCreateReplyReviewMutation();

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please write a reply");
      return;
    }

    try {
      const result = await createReplyReview({
        reviewId,
        payload: {reply: replyText}
      }).unwrap();

      if (result.success === true) {
        setIsOpen(false);
        setReplyText("");
        toast.success("Reply submitted successfully!");
      }
    } catch (err: any) {
      toast.error(err.data.message || "Failed to submit reply");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Reply</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply to {username}</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Write your reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="min-h-[120px]"
        />

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitReply} 
            disabled={!replyText.trim()}
          >
            Submit Reply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyReviewModal;