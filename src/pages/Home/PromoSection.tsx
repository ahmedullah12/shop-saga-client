import { HeadphonesIcon, Tag, Truck } from "lucide-react";

export default function PromoSection() {
  const promos = [
    {
      title: "Free Shipping",
      description: "Free delivery on all orders above $50",
      icon: <Truck className="w-6 h-6" />
    },
    {
      title: "24/7 Support",
      description: "Dedicated support anytime you need",
      icon: <HeadphonesIcon className="w-6 h-6" />
    },
    {
      title: "Special Offers",
      description: "New deals and discounts every week",
      icon: <Tag className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-1 md:px-0">
        <div className=" mb-4">
          <h2 className="text-secondary text-2xl md:text-3xl font-bold mb-4">
            Exclusive Deals & Offers
          </h2>
          <p className="text-gray-600">
            Discover amazing deals and special promotions across our entire collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="bg-accent rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-primary mb-4">
                {promo.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
              <p className="text-gray-600">{promo.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}