import Loader from "@/components/Loader";
import WarningModal from "@/components/modals/WarningModal";
import ProductCard from "@/components/product/ProductCard";
import ProductDetailsImages from "@/components/product/ProductDetailsImages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  replaceCartWithNewProduct,
  retainCurrentCart,
} from "@/redux/features/cart/cartSlice";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/productApi";
import { addViewedProduct } from "@/redux/features/recent-product/recentProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, IProductCategory } from "@/types/global";
import {
  HeadphonesIcon,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ProductReview from "./ProductReview";
import ProductShop from "./ProductShop";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const warning = useAppSelector((state) => state.cart.warning);
  const { cart, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  console.log(cart, totalPrice);
  const { data: product, isLoading } = useGetSingleProductQuery(id as string);

  const dispatch = useAppDispatch();

  const relatedCategories = product?.data?.productCategory?.map(
    (cat: IProductCategory) => cat.categoryId
  );

  const { data: relatedProducts, isLoading: relatedProductsLoading } =
    useGetAllProductsQuery({
      category: relatedCategories,
      limit: 5,
    });

  const handleIncrease = () => {
    if (quantity < product?.data?.inventoryCount) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success("Product added to cart!!");
    console.log(quantity);
    dispatch(addToCart({ ...product?.data, addedProductQuantity: quantity }));
  };

  const handleReplaceCart = () => {
    dispatch(replaceCartWithNewProduct());
  };

  const handleCancelAddition = () => {
    dispatch(retainCurrentCart());
  };

  useEffect(() => {
    if (product?.data) {
      dispatch(addViewedProduct(product?.data));
    }
  }, [dispatch, product]);

  if (isLoading || relatedProductsLoading) return <Loader />;

  const currentPrice = product?.data?.isFlashSale
    ? product?.data?.flashSalePrice
    : product?.data?.price;

  return (
    <div className="bg-background pt-4 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full mx-auto shadow-2xl border-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">
            <div className="w-full">
              <ProductDetailsImages images={product?.data?.images} />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {product?.data?.name}
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {product?.data?.rating || "0"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {product?.data?.productCategory.map(
                    (cat: IProductCategory) => (
                      <Badge
                        key={cat.categoryId}
                        className="text-white"
                        variant="secondary"
                      >
                        {cat.category.name}
                      </Badge>
                    )
                  )}
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-primary">
                    ${currentPrice?.toFixed(2)}
                  </span>
                  {product?.data?.isFlashSale && (
                    <span className="text-lg line-through text-muted-foreground">
                      ${product?.data?.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Truck className="w-5 h-5 mr-2" />
                      <p className="font-bold">FREE SHIPPING & RETURN</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Free shipping on all orders over $99.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <HeadphonesIcon className="w-5 h-5 mr-2" />
                      <p className="font-bold">ONLINE SUPPORT 24/7</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Dedicated support available around the clock
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex text-lg">
                    <p className="font-medium">Stock:</p>
                    <p className="ml-2">{product?.data?.inventoryCount}</p>
                  </div>
                  <p className="text-muted-foreground">
                    {product?.data?.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center px-4 py-2 border border-gray-200 rounded-lg">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="text-gray-500 disabled:text-gray-300 focus:outline-none"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="px-4 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      disabled={quantity >= product?.data?.inventoryCount}
                      className="text-gray-500 disabled:text-gray-300 focus:outline-none"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product?.data?.inventoryCount} available
                  </span>
                </div>

                <Button
                  className=""
                  size="sm"
                  disabled={product?.data?.inventoryCount === 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product?.data?.inventoryCount === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {warning && (
          <WarningModal
            isOpen={!!warning}
            message={warning}
            onReplace={handleReplaceCart}
            onCancel={handleCancelAddition}
          />
        )}

        {/* Shop Information */}
        <ProductShop product={product} />

        {/* Product Reviews */}
        <ProductReview product={product} />

        {relatedProducts?.data?.data?.length > 0 && (
          <div className=" mt-12">
            <h3 className="text-2xl font-bold text-secondary mb-6">
              Related Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts?.data?.data
                .filter((relatedProduct: IProduct) => relatedProduct.id !== id)
                .map((relatedProduct: IProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
