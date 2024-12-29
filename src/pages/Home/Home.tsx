import ScrollToTop from "@/components/ScrollToTop";
import Banner from "./Banner";
import Categories from "./Categories";
import FlashSaleProducts from "./FlashSaleProducts";
import Newsletter from "./Newsletter";
import RecentProducts from "./RecentProducts";

const Home = () => {
  return (
    <div>
      <ScrollToTop />
      <Banner />
      <Categories />
      <FlashSaleProducts />
      <Newsletter />
      <RecentProducts />
    </div>
  );
};

export default Home;
