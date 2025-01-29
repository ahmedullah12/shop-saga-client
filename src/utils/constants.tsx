import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import banner6 from "../assets/banner6.png";
import { MdDashboard } from "react-icons/md";
import { CiShop } from "react-icons/ci";

export const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  VENDOR: "VENDOR",
} as const;

export const vendorSideBarOptions = [
  {
    title: "Dashboard",
    route: "dashboard",
  },
  {
    title: "Shop",
    route: "shop",
  },
  {
    title: "Products",
    route: "products",
  },
  {
    title: "Reviews & Ratings",
    route: "products-reviews",
  },
  {
    title: "Order History",
    route: "shop-orders",
  },
];

export const adminSideBarOptions = [
  {
    title: "Dashboard",
    route: "dashboard",
  },
  {
    title: "Users",
    route: "all-users",
  },
  {
    title: "Shops",
    route: "shops",
  },
  {
    title: "Products Categories",
    route: "products-categories",
  },
  {
    title: "Orders History",
    route: "orders-history",
  },
  {
    title: "Subscribed Users",
    route: "subscribed-users",
  },
  {
    title: "Coupons",
    route: "coupons",
  },
];

export const bannerCarouselData = [
  {
    header: "Explore Your Journey with Shop Saga",
    desc: "Dive into a world where your shopping dreams become a reality.",
    image: banner4,
  },
  {
    header: "Shop Smart, Shop Unique",
    desc: "Experience the thrill of discovering products that truly stand out.",
    image: banner5,
  },
  {
    header: "Unlock the Saga of Savings",
    desc: "Your destination for unbeatable deals and premium quality.",
    image: banner6,
  },
];
