import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/types/global";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductShop = ({ product }: { product: { data: IProduct } }) => {
  return (
    <div className="mt-12">
      <Card className="w-full shadow-md">
        <h3 className="text-2xl text-secondary font-bold my-3 ms-4">Shop</h3>
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center space-x-4">
            {product?.data?.shop.logoUrl && (
              <img
                src={product?.data?.shop.logoUrl}
                alt={product?.data?.shop.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <div>
              <Link to={`/shop/${product?.data?.shop.id}`}>
                <p className="text-xl font-semibold text-foreground hover:underline">
                  {product?.data?.shop.name}
                </p>
              </Link>
              <div className="flex items-center text-yellow-500 mt-1">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="text-sm text-muted-foreground">
                  Verified Seller
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {product?.data?.shop.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductShop;
