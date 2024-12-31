import { Button } from "@/components/ui/button";

const Offer = () => {
  return (
    <div className="container my-12 bg-gradient-to-r from-primary/90 to-primary  p-8 md:p-12 text-white">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Limited Time Offer!
          </h3>
          <p className="text-white/90 mb-6">
            Get an extra 20% off on your first purchase. Use code WELCOME20 at
            checkout.
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 rounded-lg">
            Claim Offer
          </Button>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
            <span className="text-4xl font-bold">20% OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
