import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import SSForm from "../form/SSForm";
import SSInput from "../form/SSInput";
import SSTextarea from "../form/SSTextarea";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { useCreateShopMutation } from "@/redux/features/shop/shopApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type ModalParams = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CreateShopModal = ({ isOpen, setIsOpen }: ModalParams) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [createShop, { isLoading: shopCreateLoading }] =
    useCreateShopMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedImage) return toast.error("Please upload shop logo!!");

    const formData = new FormData();

    formData.append("logo", selectedImage);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await createShop(formData).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        setIsOpen(false);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Create Shop
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shop Setup</DialogTitle>
        </DialogHeader>
        <SSForm onSubmit={handleSubmit}>
          <SSInput label="Name" name="name" width="w-full" type="string" />
          <SSTextarea
            label="Description"
            name="description"
            width="w-full"
            rows={3}
          />
          <div className="min-w-fit mb-5">
            <Label className="text-primary text-sm font-semibold">Logo</Label>
            <label
              className="flex bg-white h-10 w-full ps-3 cursor-pointer items-center justify-start rounded-lg border-2 border-default-200 text-sm text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="logo"
            >
              {selectedImage ? selectedImage.name : "Logo"}
            </label>
            <input
              className="hidden"
              id="logo"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <Button
            disabled={shopCreateLoading}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </SSForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShopModal;
