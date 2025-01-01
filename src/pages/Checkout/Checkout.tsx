import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { CheckCircle2, CreditCard, User, ShoppingBag } from "lucide-react";
import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi";
import { useGetUserWithEmailQuery } from "@/redux/features/user/userApi";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { cart, totalPrice, discountedTotal } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const [createPayment] = useCreatePaymentMutation();

  const user = useAppSelector(useCurrentUser);
  const { data: userData, isLoading } = useGetUserWithEmailQuery(user?.email);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!paymentMethod) {
      return toast.error("Please select a payment method");
    }

    const submitData = {
      ...data,
      totalPrice: discountedTotal ? discountedTotal : totalPrice,
      products: cart,
    };

    try {
      const res = await createPayment(submitData).unwrap();
      if (res.data.result === "true") {
        window.location.href = res.data.payment_url;
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    if (cart.length < 1) {
      navigate("/");
    }
  }, [cart, navigate]);

  if (isLoading) return <Loader />;

  const defaultValues = {
    customerName: userData?.data?.name,
    customerEmail: userData?.data?.email,
    customerPhone: userData?.data?.contactNumber,
    customerAddress: userData?.data?.address ? userData?.data?.address : "",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <SSForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <div className="flex flex-col lg:flex-row gap-8 md:w-[80vw]">
              <div className="flex-grow">
                <div className="space-y-8">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
                      <User className="mr-2 text-primary" size={24} />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SSInput
                        width="w-full"
                        name="customerName"
                        type="text"
                        label="Full Name"
                      />
                      <SSInput
                        width="w-full"
                        name="customerEmail"
                        type="email"
                        label="Email Address"
                      />
                      <SSInput
                        width="w-full"
                        name="customerPhone"
                        type="tel"
                        label="Phone Number"
                      />
                      <SSInput
                        width="w-full"
                        name="customerAddress"
                        type="text"
                        label="Address"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
                      <CreditCard className="mr-2 text-primary" size={24} />
                      Payment Method
                    </h2>
                    <div className="space-y-4">
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          paymentMethod === "AamarPay"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod("AamarPay")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <CreditCard className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                AamarPay
                              </p>
                              <p className="text-sm text-gray-500">
                                Secure payment gateway
                              </p>
                            </div>
                          </div>
                          {paymentMethod === "AamarPay" && (
                            <CheckCircle2 className="text-primary" size={24} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
                    <ShoppingBag className="mr-2 text-primary" size={24} />
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-3 border-b border-gray-100"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.addedProductQuantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          $
                          {item.isFlashSale && item.flashSalePrice
                            ? (
                                item.flashSalePrice * item.addedProductQuantity
                              ).toFixed(2)
                            : (item.price * item.addedProductQuantity).toFixed(
                                2
                              )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between py-3 border-t border-gray-200">
                      <p className="text-lg font-semibold text-gray-900">
                        Total
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        ${discountedTotal ? discountedTotal.toFixed(2) : totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-medium py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Complete Purchase</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SSForm>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
