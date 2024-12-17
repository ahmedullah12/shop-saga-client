import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import ProductDetailsImages from "@/components/product/ProductDetailsImages";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/productApi";
import { IProduct, IProductCategory, IReview } from "@/types/global";
import ProductCard from "@/components/product/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  replaceCartWithNewProduct,
  retainCurrentCart,
} from "@/redux/features/cart/cartSlice";
import WarningModal from "@/components/modals/WarningModal";
import toast from "react-hot-toast";
import { addViewedProduct } from "@/redux/features/recent-product/recentProductsSlice";
import { useEffect } from "react";
import Loader from "@/components/Loader";

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

  const starRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading && relatedProductsLoading) return <Loader />;

  return (
    <div className="bg-background py-10 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="w-full mx-auto max-w-6xl shadow-xl border-none">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">
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
          </CardContent>
        </Card>

        {warning && (
          <WarningModal
            isOpen={!!warning}
            message={warning}
            onReplace={handleReplaceCart}
            onCancel={handleCancelAddition}
          />
        )}

        {/* Shop Information (Added Below) */}
        <div className="container mx-auto px-4 md:px-6 mt-8">
          <Card className="w-full mx-auto max-w-6xl shadow-md">
            <h3 className="text-2xl text-secondary font-bold my-3 ms-4">
              Shop
            </h3>
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
        {product?.data?.reviews && product.data.reviews.length > 0 && (
          <div className="container mx-auto px-4 md:px-6 mt-12">
            <Card className="w-full mx-auto max-w-6xl shadow-md">
              <h3 className="text-2xl text-secondary font-bold my-3 ms-4">
                Customer Reviews ({product.data.reviews.length})
              </h3>
              <CardContent className="p-6 md:p-8 space-y-4">
                {product.data.reviews.map((review: IReview) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {starRating(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.user.name}
                      </span>
                    </div>
                    <p className="text-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {relatedProducts?.data?.data?.length > 0 && (
          <div className="container mx-auto px-4 md:px-6 mt-12">
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
