import { Button } from "@/components/ui/button";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleIncrease = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (currentQuantity: number, productId: string) => {
    if (currentQuantity > 1) {
      dispatch(decreaseQuantity(productId));
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="md:container px-4 min-h-screen">
      {cart.length === 0 ? (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl md:text-2xl font-bold text-center">
            You haven't added any products to the cart yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
          {/* Left side - Cart items */}
          <div className="col-span-12 md:col-span-8">
            <p className="text-xl md:text-2xl text-center md:text-left font-bold mb-5">
              Your Cart items ({cart.length})
            </p>
            {cart.map((product) => (
              <div
                key={product.id}
                className="mb-4 p-4 bg-gray-50 flex justify-between items-center shadow-md rounded-lg"
              >
                {/* Product details */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 md:w-20 h-16 md:h-20 rounded-lg"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  <p className="text-xs md:text-base">{product.name}</p>
                </div>

                {/* Quantity and buttons */}
                <div className="flex items-center gap-3 md:gap-6">
                  <div className="flex items-center px-4 py-2 border border-gray-200 rounded-lg">
                    <button
                      onClick={() =>
                        handleDecrease(product.addedProductQuantity, product.id)
                      }
                      className="text-red-500 focus:outline-none"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="px-4">{product.addedProductQuantity}</span>
                    <button
                      onClick={() => handleIncrease(product.id)}
                      className="text-primary focus:outline-none"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <Button
                  size="sm"
                    className="bg-primary"
                    onClick={() => handleRemove(product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Total price and checkout */}
          <div className="col-span-12 md:col-span-4 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-medium">Order Summary</h3>
            <div className="w-full h-[1px] bg-primary my-4"></div>
            <p className="text-lg mt-10 mb-4 flex justify-between">
              Total Price:{" "}
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </p>
            <Link to="/checkout">
              <Button className="w-full mt-4">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
