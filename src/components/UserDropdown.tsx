import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IUserData } from "@/types/global";
import { Folders, LogOut, ShoppingBasket } from "lucide-react";
import { MdDashboard, MdOutlineRateReview } from "react-icons/md";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type TUserDropdown = {
  user: IUserData;
};

const UserDropdown = ({ user }: TUserDropdown) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logOut());
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger className="ms-[6px] px-2 py-1 flex items-center gap-3 text-primary md:text-white rounded">
          <Avatar className="text-black">
            {user.profileImage && <AvatarImage src={user?.profileImage} />}
            <AvatarFallback>{user && user?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{user?.name}</span>
        </PopoverTrigger>
        <PopoverContent className="w-60 bg-accent border-none">
          {user.role === "CUSTOMER" ? (
            <div className="flex flex-col gap-y-3">
              <Link
                className="flex items-center gap-x-2 text-primary font-semibold hover:underline"
                to={"/recent-products"}
              >
                <ShoppingBasket />
                Recent Products
              </Link>
              <Link
                className="flex items-center gap-x-2 text-primary font-semibold hover:underline"
                to={"/user-order-history"}
              >
                <Folders />
                Order History
              </Link>
              <Link
                className="flex items-center gap-x-2 text-primary font-semibold hover:underline"
                to={"/user-reviews"}
              >
                <MdOutlineRateReview size={24} />
                Reviews
              </Link>
            </div>
          ) : (
            <div>
              {user.role === "VENDOR" ? (
                <Link
                  className="flex items-center gap-x-2 text-primary font-semibold hover:underline"
                  to={"/dashboard/vendor/shop"}
                >
                  <MdDashboard />
                  Dashboard
                </Link>
              ) : (
                <Link
                  className="flex items-center gap-x-2  text-primary font-semibold hover:underline"
                  to={"/dashboard/admin/all-users"}
                >
                  <MdDashboard size={22}/>
                  Dashboard
                </Link>
              )}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-x-2 text-primary font-semibold mt-3"
          >
            <LogOut size={22} />
            Logout
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserDropdown;
