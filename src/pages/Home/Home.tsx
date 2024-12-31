import ScrollToTop from "@/components/ScrollToTop";
import Banner from "./Banner";
import Categories from "./Categories";
import FlashSaleProducts from "./FlashSaleProducts";
import Newsletter from "./Newsletter";
import RecentProducts from "./RecentProducts";
import PromoSection from "./PromoSection";
import Offer from "./Offer";

const Home = () => {
  return (
    <div>
      <ScrollToTop />
      <Banner />
      <PromoSection/>
      <Categories />
      <Offer/>
      <FlashSaleProducts />
      <Newsletter />
      <RecentProducts />
    </div>
  );
};

export default Home;
