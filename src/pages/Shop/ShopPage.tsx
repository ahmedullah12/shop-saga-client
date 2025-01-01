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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, Users } from "lucide-react";

const ShopPage = () => {
  const { id } = useParams();
  const user = useAppSelector(useCurrentUser);
  const { data: shopData, isLoading } = useGetSingleShopQuery(id);
  const [userFollowShop, { isLoading: isFollowing }] = useFollowShopMutation();

  const isUserFollowing = shopData?.data?.followShop.some(
    (follow: any) => follow.user.email === user?.email
  );

  const handleFollowShop = async () => {
    try {
      const res = await userFollowShop(id).unwrap();
      if (res.success === true) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Failed to follow/unfollow shop", error);
    }
  };

  if (isLoading) return <Loader />;
  if (!shopData) return <div>No shop data found</div>;

  const { name, logoUrl, description, vendor, products, followShop } =
    shopData.data || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* Shop Info Section */}
          <div className="py-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Logo and Basic Info */}
              <div className="flex-shrink-0">
                <img
                  src={logoUrl}
                  alt={`${name} logo`}
                  className="w-32 h-32 rounded-lg object-cover shadow-md"
                />
              </div>

              {/* Shop Details */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                    <p className="mt-2 text-gray-600 max-w-2xl">
                      {description}
                    </p>
                  </div>
                  {user && (
                    <Button
                      onClick={handleFollowShop}
                      size="lg"
                      disabled={isFollowing}
                      className="w-full md:w-auto"
                    >
                      {isUserFollowing ? "Following" : "Follow Shop"}
                    </Button>
                  )}
                </div>

                <div className="my-2">
                  <p className="text-md font-semibold">Vendor Details</p>
                  <div className="max-w-md flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                    <Avatar>
                      {vendor.profileImage && (
                        <AvatarImage src={vendor.profileImage} />
                      )}
                      <AvatarFallback>{vendor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-sm text-gray-500">{vendor.email}</p>
                    </div>
                  </div>
                </div>

                {/* Stats and Vendor Info */}
                <div className="mt-6 flex flex-wrap gap-6">
                  {/* Shop Stats */}
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">
                        <span className="font-semibold">{products.length}</span>{" "}
                        Products
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">
                        <span className="font-semibold">
                          {followShop?.length}
                        </span>{" "}
                        Followers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{products.length} items</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
