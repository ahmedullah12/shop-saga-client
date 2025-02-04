import Loader from "@/components/Loader";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";

const Offer = () => {
  const { data: couponData, isLoading } = useGetAllCouponsQuery({});

  if (isLoading) return <Loader />;

  if (couponData?.data?.data?.length === 0) return null;

  return (
    <section className="px-1 md:px-0">
      <div className="container my-12 bg-gradient-to-r from-primary/90 to-primary  py-8 md:py-10 px-4 text-white rounded-md">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Limited Time Offer!
          </h3>
          <p className="text-white/90 mb-6">
            Get an extra 20% off on your first purchase. Use code{" "}
            {couponData?.data?.data?.[0].couponNumber} at checkout.
          </p>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
            <span className="text-4xl font-bold">
              {couponData?.data?.data?.[0].discount}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Offer;
