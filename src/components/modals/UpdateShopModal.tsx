import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import SSForm from "../form/SSForm";
import SSInput from "../form/SSInput";
import SSTextarea from "../form/SSTextarea";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState, useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IShop } from "@/types/global";
import { useUpdateShopMutation } from "@/redux/features/shop/shopApi";

type UpdateModalParams = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentShopData: IShop;
};

const UpdateShopModal = ({
  isOpen,
  setIsOpen,
  currentShopData,
}: UpdateModalParams) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [updateShop, { isLoading: shopUpdateLoading }] =
    useUpdateShopMutation();

  // Reset image states when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(null);
      setPreviewImage(currentShopData.logoUrl || null);
    }
  }, [isOpen, currentShopData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    console.log(data);

    // Append image if a new one is selected
    if (selectedImage) {
      formData.append("logo", selectedImage);
    }

    // Append updated data
    formData.append("data", JSON.stringify(data));

    try {
      const res = await updateShop(formData).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Shop Details</DialogTitle>
        </DialogHeader>
        <SSForm
          onSubmit={handleSubmit}
          defaultValues={{
            name: currentShopData.name,
            description: currentShopData.description,
          }}
        >
          <SSInput label="Name" name="name" width="w-full" type="string" />
          <SSTextarea
            label="Description"
            name="description"
            width="w-full"
            rows={3}
          />
          <div className="min-w-fit mb-5">
            <Label className="text-primary text-sm font-semibold">Logo</Label>
            <div className="flex items-center space-x-4">
              <label
                className="flex bg-white h-10 flex-grow ps-3 cursor-pointer items-center justify-start rounded-lg border-2 border-default-200 text-sm text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="logo"
              >
                {selectedImage ? selectedImage.name : "Change Logo"}
              </label>
              {previewImage && (
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Shop Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <input
              className="hidden"
              id="logo"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <Button disabled={shopUpdateLoading} type="submit" className="w-full">
            Update Shop
          </Button>
        </SSForm>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateShopModal;
