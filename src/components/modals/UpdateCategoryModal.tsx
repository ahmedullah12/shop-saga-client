import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
import toast from "react-hot-toast";
import { ICategory } from "@/types/global";

type ModalProps = {
  category: ICategory;
};

const UpdateCategoryModal = ({ category }: ModalProps) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [isOpen, setIsOpen] = useState(false);

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const handleUpdateCategory = async () => {
    try {
      if (categoryName) {
        const res = await updateCategory({
          id: category.id,
          payload: { name: categoryName },
        }).unwrap();

        if (res.success === true) {
          toast.success(res.message);
          setIsOpen(false);
        }
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Edit Category
          </DialogTitle>
        </DialogHeader>
        <div>
          <Label>Category Name</Label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="max-w-[400px] mt-1"
          />
        </div>

        <div className="flex justify-start space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading || categoryName === category.name}
            onClick={handleUpdateCategory}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
