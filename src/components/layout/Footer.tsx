import { Button } from "@/components/ui/button";
import { useUserSubscribeMutation } from "@/redux/features/user/userApi";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  
    const [userSubscribe] = useUserSubscribeMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await userSubscribe({ email }).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        setEmail("");
      }
    } catch (err: any) {
      toast.success(err.data.message);
    }
  };
  return (
    <footer className="bg-primary pt-10 pb-2">
      <div className="mb-8 container mx-auto text-white grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold">Shop Saga</h2>
          <p className="mt-4">Enter Your Email</p>
          <form onSubmit={handleSubmit} className="mt-2 flex items-center">
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="w-full px-4 py-2 bg-accent text-black border border-neutral-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="bg-white hover:bg-accent text-primary rounded-none rounded-r-md">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-sm">
            Get monthly updates and free resources.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Contacts</h3>
          <p>Phone: +880 1339489483</p>
          <p>Email: shop-saga@gmail.com</p>
          <p>Address: Mirpur 1 , Dhaka, Bangladesh</p>
          <div className="flex space-x-4 mt-4">
            {["twitter", "facebook", "instagram", "google", "behance"].map(
              (icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8  rounded-full flex items-center justify-center hover:bg-primary"
                >
                  <i className={`icon-${icon} text-neutral-200`}></i>
                </div>
              )
            )}
          </div>
        </div>

        {/* Recent News Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">RECENT NEWS</h3>
          <ul>
            {["About Us", "Services", "Get In Touch"].map((item, index) => (
              <li key={index} className="mb-2 hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">LINKS</h3>
          <ul>
            {[
              "Website Builder",
              "Download for Mac",
              "Download for Windows",
            ].map((item, index) => (
              <li key={index} className="mb-2 hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* icons section */}
      </div>
      <div className="flex items-center justify-center gap-x-4 text-center text-white">
        <FaFacebook size={22}/>
        <FaTwitter size={22}/>
        <FaInstagram size={22}/>
        <FaLinkedin size={22}/>
      </div>
      <div className="text-white text-center mt-8">
        <p>© Copyright 2018 Mobirise - All Rights Reserved

</p>
      </div>
    </footer>
  );
}
