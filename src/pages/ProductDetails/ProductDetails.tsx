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
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ProductReview from "./ProductReview";
import ProductShop from "./ProductShop";

const ProductDetails = () => {
  const { id } = useParams();
  const warning = useAppSelector((state) => state.cart.warning);

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

  useEffect(() => {
    if (product?.data) {
      dispatch(addViewedProduct(product?.data));
    }
  }, [dispatch, product]);

  console.log(product?.data?.reviews);

  if (isLoading || relatedProductsLoading) return <Loader />;

  return (
    <div className="bg-background pt-4 pb-10">
      <div className="container mx-auto">
        <div className="w-full mx-auto shadow-2xl border-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">
            {/* Image Section (Unchanged) */}
            {product?.data && (
              <div className="w-full">
                <ProductDetailsImages images={product?.data?.images} />
              </div>
            )}

            {/* Product Information Section */}
            <div className="">
              {/* Product Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product?.data?.name}
                </h2>

                {/* Categories */}
                <div className="flex gap-2 mb-8">
                  {product?.data?.productCategory.map(
                    (cat: IProductCategory) => (
                      <Badge
                        key={cat.categoryId}
                        variant="secondary"
                        className="text-xs text-white uppercase tracking-wider"
                      >
                        {cat.category.name}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center space-x-4 mb-3">
                <p className="text-2xl font-bold text-primary">
                  $
                  {product?.data?.isFlashSale
                    ? product?.data?.flashSalePrice?.toFixed(2)
                    : product?.data?.price.toFixed(2)}
                </p>

                {product?.data?.isFlashSale && (
                  <p className="text-sm line-through text-muted-foreground">
                    ${product?.data?.price.toFixed(2)}
                  </p>
                )}

                {product?.data?.inventoryCount > 0 ? (
                  <Badge variant="outline" className="text-green-600">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <div className="prose max-w-none text-muted-foreground mb-4">
                <p>Quantity: {product?.data?.inventoryCount}</p>
              </div>

              <div className="prose max-w-none text-muted-foreground mb-6">
                <p>{product?.data?.description}</p>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full"
                size="lg"
                disabled={product?.data?.inventoryCount === 0}
                onClick={() => handleAddToCart(product?.data)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product?.data?.inventoryCount === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
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
