import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { CheckCircle2, CreditCard, User } from "lucide-react";

import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { cart, totalPrice } = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const [createPayment] = useCreatePaymentMutation();

  console.log(cart);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validate payment method
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Add payment method to form data
    const submitData = {
      ...data,
      totalPrice,
      products: cart
    };

    try {
      const res = await createPayment(submitData).unwrap();
      console.log(res);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-primary text-center">
            Checkout
          </h1>
        </div>

        <div className="px-6">
          <SSForm onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="mr-2 text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SSInput
                  width="max-w-[300px]"
                  name="customerName"
                  type="text"
                  label="Name"
                />
                <SSInput
                  width="max-w-[300px]"
                  name="customerEmail"
                  type="text"
                  label="Email"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SSInput
                  width="max-w-[300px]"
                  name="customerPhone"
                  type="text"
                  label="Phone"
                />
                <SSInput
                  width="max-w-[300px]"
                  name="customerAddress"
                  type="text"
                  label="Address"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <CreditCard className="mr-2 text-blue-600" />
                Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    paymentMethod === "AamarPay"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  onClick={() => setPaymentMethod("AamarPay")}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">AamarPay</span>
                    {paymentMethod === "AamarPay" && (
                      <CheckCircle2 className="text-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2"
                disabled={!paymentMethod}
              >
                <span>Proceed to Payment</span>
              </button>
            </div>
          </SSForm>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
