import { useEffect, useState } from "react";
import { Check, Star } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsVisible(true);
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div
        className={`
          bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full 
          transform transition-all duration-1000 
          ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        <div className="relative">
          <div className="absolute -top-12 -left-8 opacity-20">
            <Star className="text-yellow-300 w-24 h-24 animate-pulse" />
          </div>
          <div className="absolute -bottom-12 -right-8 opacity-20">
            <Star className="text-blue-300 w-24 h-24 animate-pulse" />
          </div>

          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 animate-fade-in">
            Payment Successful!
          </h1>
          <p className="text-center text-gray-600 mb-6 animate-fade-in-delay">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>

          <div className="flex space-x-4">
            <Link
              to="/user-order-history"
              className=" flex-1 bg-blue-500 text-white py-3 rounded-lg
              hover:bg-blue-600 transition-colors focus:outline-none
              focus:ring-2 focus:ring-blue-400 flex items-center justify-center
              "
            >
              View Order
            </Link>
            <Link
              to="/all-products"
              className=" flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg
              hover:bg-gray-200 transition-colors focus:outline-none
              focus:ring-2 focus:ring-gray-300 flex items-center justify-center
              "
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
