import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import SSTextarea from "@/components/form/SSTextarea";
import { Button } from "@/components/ui/button";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/global";
import { FieldValues, SubmitHandler } from "react-hook-form";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading: productLoading } =
    useGetSingleProductQuery(id as string);
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  const [initialFormData, setInitialFormData] = useState<any>(null);

  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      setInitialFormData({
        name: product.name,
        price: product.price,
        inventoryCount: product.inventoryCount,
        description: product.description,
        categories: product.productCategory.map((pc: any) => ({
          value: pc.categoryId,
          label: pc.category.name,
        })),
      });
    }
  }, [productData]);

  const categoryOptions =
    categories?.data?.map((category: ICategory) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payloadData = {
      ...data,
      categories: data.categories?.map((category: any) => category.value),
      price: parseFloat(data.price),
      inventoryCount: parseInt(data.inventoryCount, 10),
    };

    try {
      const res = await updateProduct({
        payload: payloadData,
        id: productData?.data?.id,
      }).unwrap();
      console.log(res);
      if (res.success === true) {
        toast.success(res.message);
        navigate("/dashboard/vendor/products");
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  if (productLoading || !initialFormData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <div className="max-w-[900px] mx-auto mt-10 shadow-lg p-6 rounded-lg">
        <h1 className="text-2xl text-secondary font-semibold mb-6">
          Update Product
        </h1>

        <SSForm onSubmit={handleSubmit} defaultValues={initialFormData}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <SSInput
                name="name"
                type="text"
                width="full"
                label="Product Name"
              />

              <SSInput name="price" type="number" width="full" label="Price" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SSInput
                name="inventoryCount"
                type="number"
                width="full"
                label="Inventory Count"
              />

              <div>
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
              width="full"
              label="Description"
              rows={4}
            />

            <div className="mt-6">
              <Button
                type="submit"
                disabled={updateProductLoading}
                className="w-full max-w-[200px]"
              >
                {updateProductLoading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </div>
        </SSForm>
      </div>
    </div>
  );
};

export default UpdateProduct;
