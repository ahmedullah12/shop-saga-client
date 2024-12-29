import { IProduct } from "@/types/global";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import {
  addToCart,
  replaceCartWithNewProduct,
  retainCurrentCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import WarningModal from "../modals/WarningModal";
import toast from "react-hot-toast";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const warning = useAppSelector((state) => state.cart.warning);

  const location = useLocation();

  const handleAddToCart = (product: IProduct) => {
    toast.success("Product added to cart!!");
    dispatch(addToCart(product));
  };

  const handleReplaceCart = () => {
    dispatch(replaceCartWithNewProduct());
  };

  const handleCancelAddition = () => {
    dispatch(retainCurrentCart());
  };
  return (
    <>
      <Card className="w-full max-w-sm mx-auto relative flex flex-col">
        {product.isFlashSale && (
          <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded z-20">
            Flash Sale
          </div>
        )}
        <CardHeader className="p-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-40 object-cover rounded-t-md"
          />
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-lg font-semibold min-h-[48px]">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {product.description.slice(0, 50) + "..."}
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold text-primary">
              $
              {product.isFlashSale
                ? product.flashSalePrice?.toFixed(2)
                : product.price}
            </p>
            {product.isFlashSale && (
              <p className="text-sm line-through text-muted-foreground">
                ${product.price}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0 mt-auto">
          <Link to={`/products/${product.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          {location.pathname !== "/dashboard/vendor/shop" && (
            <Button
              onClick={() => handleAddToCart(product)}
              variant="default"
              size="sm"
            >
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>

      {warning && (
        <WarningModal
          isOpen={!!warning}
          message={warning}
          onReplace={handleReplaceCart}
          onCancel={handleCancelAddition}
        />
      )}
    </>
  );
};

export default ProductCard;
