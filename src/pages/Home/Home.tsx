import ScrollToTop from "@/components/ScrollToTop";
import AllProducts from "./AllProducts";
import Banner from "./Banner";
import Categories from "./Categories";
import FlashSaleProducts from "./FlashSaleProducts";
import Newsletter from "./Newsletter";

const Home = () => {
  
  return (
    <div>
      <ScrollToTop/>
      <Banner/>
      <Categories/>
      <FlashSaleProducts/>
      <Newsletter/>
      <AllProducts/>
    </div>
  );
};

export default Home;