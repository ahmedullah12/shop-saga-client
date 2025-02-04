import { Store, Package, Info, Contact, ShoppingCart } from "lucide-react";

export const Menus = [
  {
    title: "Products",
    path: "/products",
    icon: <Package size={18} />,
  },
  {
    title: "Shops",
    path: "/shops",
    icon: <Store size={18} />,
  },
  {
    title: "About",
    path: "/about",
    icon: <Info size={18} />,
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <Contact size={18} />,
  },
  {
    title: "Cart",
    path: "/cart",
    icon: <ShoppingCart size={18} />,
  },
];