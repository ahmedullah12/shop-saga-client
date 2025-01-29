import { useCurrentUser } from "@/redux/features/auth/authApi";
import { useGetUserWithEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { Menus } from "@/utils/navMenus";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Search, Menu as MenuIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover } from "../ui/popover";
import UserDropdown from "../UserDropdown";
import { motion } from "framer-motion";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import MegaMenu from "../MegaMenu";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const { data: userData } = useGetUserWithEmailQuery(user?.email);
  const cart = useAppSelector((state) => state.cart.cart);

  const { data: categories } = useGetAllCategoriesQuery({ limit: 14 });

  const mobileNavVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-200%" },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?searchTerm=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-secondary w-full fixed top-0 z-50 shadow-md">
      <div className="lg:container lg:px-0 mx-auto">
        {/* Top bar */}
        <div className="h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-2xl text-white font-semibold italic shrink-0"
          >
            Shop Saga
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="bg-primary absolute right-0 top-0 text-white hover:text-white/70 rounded-r-md rounded-l-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative mt-1">
              <FaCartShopping size={24} className="text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            </Link>

            {userData?.data ? (
              <UserDropdown user={userData.data} />
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="w-60 px-3 py-4 mt-1 flex flex-col gap-y-4 bg-accent text-primary rounded z-50">
                    <Link
                      className="flex items-center gap-x-2 text-primary font-semibold hover:underline"
                      to={"/login"}
                    >
                      <FaSignInAlt size={20} />
                      Sign In
                    </Link>

                    <Link
                      className="flex items-center gap-x-2 text-primary font-semibold hover:underline"
                      to={"/register"}
                    >
                      <MdOutlineAssignmentInd size={20} />
                      Sign Up
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation menu with Mega Menu */}
        <div className="border-t border-white/20 relative w-[50vw]">
          <ul className="hidden md:flex items-center justify-start space-x-8 h-12">
            <li className="group relative">
              <button className="flex items-center gap-1 text-md font-medium text-white/80 hover:text-white transition-all duration-300">
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>
              <MegaMenu categories={categories} />
            </li>
            {Menus.filter((item) => item.title !== "Cart").map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-md font-medium transition-all duration-300 hover:text-white relative
                    ${isActive ? "text-white" : "text-white/80"}
                    after:content-[""] after:absolute after:w-0 after:h-0.5 
                    after:bg-white after:left-0 after:-bottom-1
                    after:transition-all after:duration-300
                    hover:after:w-full`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={mobileNavVariants}
          className="md:hidden bg-white absolute left-0 right-0 shadow-lg"
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="p-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="bg-primary absolute right-0 top-0 text-white hover:text-white/70 rounded-r-md rounded-l-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Mobile Menu Items */}
          <ul className="px-4 space-y-2 pb-4">
            {Menus.filter((item) => item.title !== "Cart").map((item, idx) => (
              <li key={idx} className="text-primary">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 flex items-center gap-x-3 rounded transition-all duration-300 ${
                      isActive
                        ? "bg-secondary text-white"
                        : "hover:bg-secondary/10"
                    }`
                  }
                  onClick={handleMenuItemClick}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </nav>
  );
}
