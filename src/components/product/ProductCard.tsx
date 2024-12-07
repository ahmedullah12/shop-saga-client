import { IProduct } from "@/types/global";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className="w-full max-w-sm mx-auto relative">
      {product.isFlashSale && (
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded z-50">
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
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {product.description}
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
      <CardFooter className="flex justify-between items-center p-4">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button variant="default" size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
