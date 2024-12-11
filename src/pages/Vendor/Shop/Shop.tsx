import { useState } from "react";
import { Edit, StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateShopModal from "@/components/modals/CreateShopModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetUserShopQuery } from "@/redux/features/shop/shopApi";
import UpdateShopModal from "@/components/modals/UpdateShopModal";

const Shop = () => {
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false);
  const [isUpdateShopModalOpen, setIsUpdateShopModalOpen] = useState(false);

  const { data: shopData, isLoading } = useGetUserShopQuery(undefined);
  console.log(shopData?.products);

  if (isLoading) return <p>Loading...</p>;

  if (!shopData.data) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <StoreIcon className="w-8 h-8 text-primary" />
              Create Your Shop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              As a vendor, you can create your own online shop to showcase and
              sell your products.
            </p>
            <CreateShopModal
              isOpen={isCreateShopModalOpen}
              setIsOpen={setIsCreateShopModalOpen}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center justify-center gap-2 text-primary">
            <Avatar className="">
              <AvatarImage src={shopData?.data?.logoUrl} />
            </Avatar>
            <span>{shopData?.data?.name}</span>
          </CardTitle>
          <Button onClick={() => setIsUpdateShopModalOpen(true)} variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit Shop
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shop Details</h3>
              <p>
                <strong>Description:</strong> {shopData?.data?.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 ">
        <h3 className="text-secondary text-2xl font-semibold mb-2">Products</h3>
        {shopData?.data?.products?.length === 0 ? (
          <p className="text-muted-foreground">
            No products added yet. Click "Add Product" to get started.
          </p>
        ) : (
          <div></div>
        )}
      </div>
      <UpdateShopModal
        isOpen={isUpdateShopModalOpen}
        setIsOpen={setIsUpdateShopModalOpen}
        currentShopData={shopData?.data}
      />
    </div>
  );
};

export default Shop;
