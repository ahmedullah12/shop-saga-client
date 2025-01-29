import ScrollToTop from "@/components/ScrollToTop";
import Banner from "./Banner";
import Categories from "./Categories";
import FlashSaleProducts from "./FlashSaleProducts";
import Newsletter from "./Newsletter";
import RecentProducts from "./RecentProducts";
import PromoSection from "./PromoSection";
import Offer from "./Offer";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const Home = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("One Tap Login Failed");
    },
  });
  return (
    <div>
      <ScrollToTop />
      <Banner />
      <Categories />
      <PromoSection />
      <Offer />
      <FlashSaleProducts />
      <Newsletter />
      <RecentProducts />
    </div>
  );
};

export default Home;
