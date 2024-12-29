import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";

export const Menus = [
  { title: "Home", path: "/", icon: <FaHome size={18} color="#674188" /> },
  {
    title: "All Products",
    path: "/all-products",
    icon: <MdInventory  size={18} color="#674188" />,
  },
  {
    title: "Shops",
    path: "/all-products",
    icon: <MdInventory  size={18} color="#674188" />,
  },
  {
    title: "About",
    path: "/all-products",
    icon: <MdInventory  size={18} color="#674188" />,
  },
  {
    title: "Contact Us",
    path: "/all-products",
    icon: <MdInventory  size={18} color="#674188" />,
  },
  {
    title: "Cart",
    path: "/cart",
    icon: <FaCartShopping  size={18} color="#674188" />,
  },
];
