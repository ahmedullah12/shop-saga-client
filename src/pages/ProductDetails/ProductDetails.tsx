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
import { IProduct, IProductCategory } from "@/types/global";
import ProductCard from "@/components/product/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useGetSingleProductQuery(id as string);

  const relatedCategories = product?.data?.productCategory?.map(
    (cat: IProductCategory) => cat.categoryId
  );

  const { data: relatedProducts, isLoading: relatedProductsLoading } =
    useGetAllProductsQuery({
      category: relatedCategories,
      // Optionally exclude the current product
    });

  console.log(relatedProducts);

  if (isLoading && relatedProductsLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary"></div>
      </div>
    );

  return (
    <div className="bg-background py-10 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="w-full mx-auto max-w-6xl shadow-xl border-none">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">
            {/* Image Section (Unchanged) */}
            <div className="w-full">
              <ProductDetailsImages images={product?.data?.images} />
            </div>

            {/* Product Information Section */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.data.name}
                </h2>

                {/* Categories */}
                <div className="flex gap-2 mb-4">
                  {product.data.productCategory.map((cat: IProductCategory) => (
                    <Badge
                      key={cat.categoryId}
                      variant="secondary"
                      className="text-xs text-white uppercase tracking-wider"
                    >
                      {cat.category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center space-x-4">
                <p className="text-2xl font-bold text-primary">
                  $
                  {product.data.isFlashSale
                    ? product.data.flashSalePrice?.toFixed(2)
                    : product.data.price.toFixed(2)}
                </p>

                {product.data.isFlashSale && (
                  <p className="text-sm line-through text-muted-foreground">
                    ${product.data.price.toFixed(2)}
                  </p>
                )}

                {product.data.inventoryCount > 0 ? (
                  <Badge variant="outline" className="text-green-600">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              {/* Description */}
              <div className="prose max-w-none text-muted-foreground">
                <p>{product.data.description}</p>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full"
                size="lg"
                disabled={product.data.inventoryCount === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.data.inventoryCount === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shop Information (Added Below) */}
        <div className="container mx-auto px-4 md:px-6 mt-8">
          <Card className="w-full mx-auto max-w-6xl shadow-md">
            <h3 className="text-2xl text-secondary font-bold my-3 ms-4">
              Shop
            </h3>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center space-x-4">
                {product.data.shop.logoUrl && (
                  <img
                    src={product.data.shop.logoUrl}
                    alt={product.data.shop.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <Link to={`/shop/${product.data.shop.id}`}>
                    <p className="text-xl font-semibold text-foreground hover:underline">
                      {product.data.shop.name}
                    </p>
                  </Link>
                  <div className="flex items-center text-yellow-500 mt-1">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span className="text-sm text-muted-foreground">
                      Verified Seller
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.data.shop.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
