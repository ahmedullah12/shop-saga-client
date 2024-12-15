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
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import toast from "react-hot-toast";

const CreateCategoryModal = () => {
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleCreateCategory = async () => {
    try {
      if (category) {
        const res = await createCategory({ name: category }).unwrap();
        if(res.success === true){
          toast.success(res.message);
          setIsOpen(false)
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
        <Button size="sm">Create Category</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Create Category
          </DialogTitle>
        </DialogHeader>
        <div>
          <Label>Category</Label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="max-w-[400px] mt-1"
          />
        </div>

        <div className="flex justify-start space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleCreateCategory}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
