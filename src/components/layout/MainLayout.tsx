import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[70px] md:pt-[120px]">
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
