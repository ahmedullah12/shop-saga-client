import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

export const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  VENDOR: "VENDOR",
} as const;

export const vendorSideBarOptions = [
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
];

export const bannerCarouselData = [
  {
    header: "Explore Your Journey with Shop Saga",
    desc: "Dive into a world where your shopping dreams become a reality.",
    image: banner1,
  },
  {
    header: "Shop Smart, Shop Unique",
    desc: "Experience the thrill of discovering products that truly stand out.",
    image: banner2,
  },
  {
    header: "Unlock the Saga of Savings",
    desc: "Your destination for unbeatable deals and premium quality.",
    image: banner3,
  },
];
