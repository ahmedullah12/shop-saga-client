import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/utils/constants";
import { Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const user = useAppSelector(useCurrentUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleNavigateCheckout = () => {
    if(user && (user.role !== UserRole.CUSTOMER)){
      return toast.error("You need a customer account to proceed!!")
    }
    
    if (user) {
      return navigate("/checkout");
    }

    return toast.error("Please login to checkout!!");
  };

  return (
    <div className="md:container px-4 min-h-screen">
      <div className="w-full bg-gray-50 mb-6 px-4 py-6">
              <h1 className="text-3xl font-bold text-primary mb-6">Cart</h1>
              <p className="flex items-center space-x-3text-md font-bold">
                <span>Home</span> <MdKeyboardArrowRight size={20} />{" "}
                <span className="text-primary">Cart</span>
              </p>
            </div>
      {cart.length === 0 ? (
        <div className="min-h-screen flex">
          <p className="text-xl md:text-2xl font-bold text-primary mt-4">
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
            {cart.length > 0 && cart.map((product) => (
              <div
                key={product.id}
                className="mb-4 p-4 bg-gray-50 flex justify-between items-center shadow-md rounded-lg"
              >
                {/* Product details */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 md:w-20 h-16 md:h-20 rounded-lg"
                    src={product?.images[0]}
                    alt={product?.name}
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
            {
              cart.length > 0 && cart.map(prod => (
                <div key={prod.id} className="flex justify-between text-sm mt-4">
                  <p>{prod.name}</p>
                  <p>${prod.flashSalePrice ? prod.flashSalePrice.toFixed(2) : prod.price}({prod.addedProductQuantity})</p>
                </div>
              ))
            }
            <div className="w-full h-[1px] bg-primary my-4"></div>
            <p className="text-lg mt-10 mb-4 flex justify-between">
              Total Price:{" "}
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </p>

            <Button onClick={handleNavigateCheckout} className="w-full mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
