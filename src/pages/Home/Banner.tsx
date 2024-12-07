import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <div className="h-[400px] flex items-center justify-center bg-accent text-center">
      <div className="max-w-xl px-6">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Welcome to Shop Saga
        </h1>
        <p className="text-lg text-primary mb-6">
          Discover a world of quality products, seamless shopping, and
          unbeatable deals.
        </p>
        <Button className="bg-primary text-white hover:bg-gray-200 hover:bg-secondary">
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
