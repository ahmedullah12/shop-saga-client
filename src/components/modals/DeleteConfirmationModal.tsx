import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type DeleteResponse = {
    success: boolean;
    message: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<DeleteResponse>;
  title?: string;
  description?: string;
  deleteButtonText?: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onOpenChange,
  onDelete,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  deleteButtonText = "Yes, Delete",
}: DeleteConfirmationModalProps) => {
  const handleDelete = async () => {
    try {
      const res = await onDelete();
     if(res.success === true){
        onOpenChange(false);
        toast.success(res.message);
     }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Trash2 className="mr-2 h-5 w-5 text-destructive" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {deleteButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
