import { logOut } from "@/redux/features/auth/authSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useAppDispatch } from "@/redux/hooks";
import { IUserData } from "@/types/global";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

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
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{user && user?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{user?.name}</span>
        </PopoverTrigger>
        <PopoverContent className="w-32 bg-accent border-none">
          <Button
            onClick={handleLogout}
            className="mt-4 px-2 py-1 text-sm bg-primary hover:bg-secondary text-white rounded"
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserDropdown;
