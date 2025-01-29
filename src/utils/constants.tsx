import {
  FileClock,
  LayoutDashboard,
  LayoutList,
  MessageSquareMore,
  ShoppingBasket,
  Store,
  Ticket,
  UserCheck,
  Users,
} from "lucide-react";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import banner6 from "../assets/banner6.png";

export const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  VENDOR: "VENDOR",
} as const;

export const vendorSideBarOptions = [
  {
    title: "Dashboard",
    route: "dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Shop",
    route: "shop",
    icon: <Store />,
  },
  {
    title: "Products",
    route: "products",
    icon: <ShoppingBasket />,
  },
  {
    title: "Reviews & Ratings",
    route: "products-reviews",
    icon: <MessageSquareMore />,
  },
  {
    title: "Order History",
    route: "shop-orders",
    icon: <FileClock />,
  },
];

export const adminSideBarOptions = [
  {
    title: "Dashboard",
    route: "dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Users",
    route: "all-users",
    icon: <Users />,
  },
  {
    title: "Shops",
    route: "shops",
    icon: <Store />,
  },
  {
    title: "Products Categories",
    route: "products-categories",
    icon: <LayoutList />,
  },
  {
    title: "Orders History",
    route: "orders-history",
    icon: <FileClock />,
  },
  {
    title: "Subscribed Users",
    route: "subscribed-users",
    icon: <UserCheck />,
  },
  {
    title: "Coupons",
    route: "coupons",
    icon: <Ticket />,
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
