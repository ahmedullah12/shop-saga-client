import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 blur-lg opacity-75"></div>
                  <div className="relative bg-white rounded-full p-3">
                    <Bell className="h-6 w-6 text-gray-800" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay in the Loop</h2>
              <p className="max-w-[600px] mx-auto text-gray-600 md:text-lg">
                Subscribe to our newsletter to get notified about new products, exclusive offers, and exciting updates. 
                Be the first to know when we add fresh items to our collection!
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md space-y-2">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 bg-white border-gray-200 focus:border-gray-900 focus:ring-gray-900 text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit"
                className="h-12 px-8 text-base font-medium hover:bg-gray-800 text-white transition-colors duration-150"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}