import { Link, NavLink } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";
import { ReactNode, useState } from "react";
import { Menus } from "@/utils/navMenus";
import { BiLogIn } from "react-icons/bi";
import { HiOutlineLogin } from "react-icons/hi";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const mobileNavVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-200%" },
  };

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  const ActiveLink = ({
    children,
    to,
  }: {
    children: ReactNode;
    to: string;
  }) => {
    return (
      <NavLink to={to} className="relative group">
        {({ isActive }) => (
          <>
            {children}
            <motion.div
              initial={false}
              animate={{
                width: isActive ? "100%" : "0%",
                opacity: isActive ? 1 : 0,
              }}
              className="absolute -bottom-2 left-0 h-[3px] bg-white rounded-full"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div
              initial={false}
              animate={{
                width: "0%",
                opacity: 0,
              }}
              whileHover={{
                width: !isActive ? "100%" : "0%",
                opacity: !isActive ? 1 : 0,
              }}
              className="absolute -bottom-2 left-0 h-0.5 bg-primary rounded-full"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </>
        )}
      </NavLink>
    );
  };

  return (
    <nav className="bg-primary w-full fixed top-0 z-50 h-16">
      <div className="lg:container mt-2 md:mt-4 relative flex items-center justify-between px-4 md:flex md:justify-between">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link to="/" className="text-2xl text-white font-semibold italic">
            Shop Saga
          </Link>
          <ul className=" hidden md:flex items-center space-x-4 lg:space-x-6">
            {Menus.map((item, idx) => (
              <li
                key={idx}
                className="text-white font-semibold text-sm lg:text-base"
              >
                <ActiveLink to={item.path}>
                  <span className="px-2 py-1 lg:px-3 lg:py-2 transition-all duration-500 ease-in-out rounded hover:bg-accent hover:text-primary">
                    {item.title}
                  </span>
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4 relative">
          <div className="flex">
            <ActiveLink to="/login">
              <span className="px-2 py-1 rounded flex items-center gap-1 text-white font-semibold text-sm lg:text-base transition-all duration-500 ease-in-out hover:bg-accent hover:text-primary">
                Login
              </span>
            </ActiveLink>
            <ActiveLink to="/register">
              <span className="px-2 py-1 rounded flex items-center gap-1 text-white font-semibold text-sm lg:text-base transition-all duration-500 ease-in-out hover:bg-accent hover:text-primary">
                Register
              </span>
            </ActiveLink>
          </div>
        </div>
        <div className="md:hidden">
          <Hamburger color="white" toggled={open} toggle={setOpen} />
        </div>
        <motion.div
          animate={open ? "open" : "closed"}
          variants={mobileNavVariants}
          className="block md:hidden bg-white fixed left-0 right-0 top-16"
        >
          <ul className="ps-4 space-y-2">
            {Menus.map((item, idx) => (
              <li key={idx} className="text-primary hover:text-slate-50">
                <NavLink
                  className="px-3 py-1 flex items-center gap-x-3 transition-all duration-700 ease-in-out rounded"
                  to={item.path}
                  onClick={handleMenuItemClick}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-1 px-4 pb-2 relative">
            <div>
              <NavLink
                className="px-3 mb-4 pt-1 flex items-center gap-x-3 text-primary hover:text-secondary transition-all duration-700 ease-in-out rounded"
                to="/login"
                onClick={handleMenuItemClick}
              >
                <BiLogIn size={18} color="#674188" />
                Login
              </NavLink>
              <NavLink
                className="px-3 flex items-center gap-x-3 text-primary hover:text-secondary transition-all duration-700 ease-in-out rounded"
                to="/register"
                onClick={handleMenuItemClick}
              >
                <HiOutlineLogin size={18} color="#674188" />
                Register
              </NavLink>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
