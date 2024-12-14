import { useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import { useGetSingleShopQuery } from "@/redux/features/shop/shopApi";
import ProductCard from "@/components/product/ProductCard";
import { IProduct } from "@/types/global";
import { Button } from "@/components/ui/button";
import { useFollowShopMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

const ShopPage = () => {
  const { id } = useParams();
  const user = useAppSelector(useCurrentUser);

  const { data: shopData, isLoading } = useGetSingleShopQuery(id);

  const [userFollowShop, { isLoading: isFollowing }] = useFollowShopMutation();

  const isUserFollowing = shopData?.data.followShop.some(
    (follow: any) => follow.user.email === user?.email
  );

  const handleFollowShop = async () => {
    try {
      const res = await userFollowShop(id).unwrap();
      
      if(res.success === true){
        toast.success(res.message)
      }
      
    } catch (error) {
      console.error("Failed to follow/unfollow shop", error);
    }
  };

  if (isLoading) return <Loader />;

  if (!shopData) return <div>No shop data found</div>;

  const { name, logoUrl, description, vendor, products, followShop } = shopData.data;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      <div className="bg-accent lg:w-1/4 lg:sticky lg:left-0 lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto z-10">
        <div className="p-6">
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <img
                src={logoUrl}
                alt={`${name} logo`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h1 className="text-2xl font-bold text-center mb-2">{name}</h1>
              <p className="text-gray-600 text-center mb-4">{description}</p>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-2">Vendor Details</h2>
              <div className="flex items-center space-x-3">
                <img
                  src={vendor.profileImage}
                  alt={vendor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{vendor.name}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-primary">
                Followers: {followShop.length}
              </p>
              {user && (
                <Button 
                  onClick={handleFollowShop} 
                  size={"sm"} 
                  disabled={isFollowing}
                >
                  {isUserFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-3/4 p-6 lg:pl-0 ms-4">
        <h2 className="text-2xl font-bold mb-6">{name} Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;