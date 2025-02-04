import { Button } from "@/components/ui/button";
import { useUserSubscribeMutation } from "@/redux/features/user/userApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
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

  const socialLinks = [
    { icon: <FaFacebook size={22} />, url: "https://facebook.com" },
    { icon: <FaTwitter size={22} />, url: "https://twitter.com" },
    { icon: <FaInstagram size={22} />, url: "https://instagram.com" },
    { icon: <FaLinkedin size={22} />, url: "https://linkedin.com" }
  ];

  return (
    <footer className="bg-primary pt-10 pb-2">
      <div className="mb-8 container mx-auto text-white grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h2 className="text-xl font-semibold">Shop Saga</h2>
          <p className="mt-4">Enter Your Email</p>
          <form onSubmit={handleSubmit} className="mt-2 flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourmail@example.com"
              className="w-full px-4 py-2 bg-accent text-black border border-neutral-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              className="bg-white hover:bg-accent text-primary rounded-none rounded-r-md"
            >
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
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">RECENT NEWS</h3>
          <ul>
            <li className="mb-2 hover:underline">
              <Link to="/about">About Us</Link>
            </li>
            <li className="mb-2 hover:underline">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-4 text-center text-white">
        {socialLinks.map((social, index) => (
          <a 
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            {social.icon}
          </a>
        ))}
      </div>

      <div className="text-white text-center mt-8">
        <p>© Copyright 2024 ShopSaga - All Rights Reserved</p>
      </div>
    </footer>
  );
}