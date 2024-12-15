import { useState } from "react";
import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/global";
import SSTextarea from "@/components/form/SSTextarea";
import MultiImageUpload from "@/components/MultiImageUpload";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

const AddProduct = () => {
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [images, setImages] = useState<File[] | []>([]);

  const navigate = useNavigate();

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(undefined);

  const [createProduct, {isLoading: createProductLoading}] = useCreateProductMutation();

  const categoryOptions =
    categories?.data?.data?.map((category: ICategory) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveImage = (fileName: string) => {
    setImages(images.filter((image) => image.name !== fileName));
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (images.length === 0) {
      return toast.error("Please upload at least one product image!");
    }

    if (images.length > 3) return toast.error("Please upload max 3 images");

    const formData = new FormData();

    const productData = {
      ...data,
      isFlashSale,
      categories: data.categories?.map((category: any) => category.value),

      price: parseFloat(data.price),
      inventoryCount: parseInt(data.inventoryCount, 10),
      discount: data.discount ? parseFloat(data.discount) : null,
    };

    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("data", JSON.stringify(productData));

    const res = await createProduct(formData).unwrap();
    if (res.success === true) {
      toast.success(res.message);
      navigate("/dashboard/vendor/products");
    }
  };

  if(categoriesLoading) return <Loader/>

  return (
    <div className="container px-4">
      <div className="max-w-[900px] mx-auto mt-10 shadow-lg p-4">
        <h1 className="text-2xl text-secondary font-semibold mb-6">
          Create Product
        </h1>

        <SSForm onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2">
              <SSInput
                name="name"
                type="text"
                width="max-w-[400px]"
                label="Product Name"
              />

              <SSInput
                name="price"
                type="number"
                width="max-w-[400px]"
                label="Price"
              />
            </div>

            <div className="grid md:grid-cols-2">
              <SSInput
                name="inventoryCount"
                type="number"
                width="max-w-[400px]"
                label="Inventory Count"
              />

              <div className="max-w-[400px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories
                </label>
                <Controller
                  name="categories"
                  rules={{ required: "At least one category is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Select
                        {...field}
                        isMulti
                        options={categoryOptions}
                        isLoading={categoriesLoading}
                        placeholder="Select categories"
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <SSTextarea
              name="description"
              width="max-w-[400px]"
              label="Description"
              rows={3}
            />

            <div className="flex items-center space-x-2 max-w-[400px]">
              <input
                type="checkbox"
                id="isFlashSale"
                checked={isFlashSale}
                onChange={(e) => setIsFlashSale(e.target.checked)}
                className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <label
                htmlFor="isFlashSale"
                className="text-sm font-medium text-gray-700"
              >
                Is Flash Sale?
              </label>
            </div>

            {isFlashSale && (
              <SSInput
                name="discount"
                type="number"
                width="max-w-[400px]"
                label="Discount Percentage(%)"
              />
            )}

            <MultiImageUpload
              images={images}
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
            />

            <div className=" mt-6">
              <Button disabled={createProductLoading} type="submit" className="max-w-[200px]">
                Create Product
              </Button>
            </div>
          </div>
        </SSForm>
      </div>
    </div>
  );
};

export default AddProduct;
