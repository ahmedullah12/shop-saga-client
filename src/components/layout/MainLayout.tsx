import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[64px]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
