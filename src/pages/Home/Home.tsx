import AllProducts from "./AllProducts";
import Banner from "./Banner";
import Categories from "./Categories";
import FlashSaleProducts from "./FlashSaleProducts";

const Home = () => {
  
  return (
    <div>
      <Banner/>
      <Categories/>
      <FlashSaleProducts/>
      <AllProducts/>
    </div>
  );
};

export default Home;