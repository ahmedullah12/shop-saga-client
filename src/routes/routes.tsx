import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register/Register";
import Login from "@/pages/Login/Login";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import SuccessPage from "@/pages/SuccessPage/SuccessPage";
import RecentViewedProducts from "@/pages/RecentViewedProducts/RecentViewedProducts";
import AllProducts from "@/pages/Home/AllProducts";
import UserOrderHistory from "@/pages/UserOrderHistory/UserOrderHistory";
import UserReviews from "@/pages/UserReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/recent-products",
        element: <RecentViewedProducts />,
      },
      {
        path: "/user-order-history",
        element: <UserOrderHistory />,
      },
      {
        path: "/user-reviews",
        element: <UserReviews />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/success",
        element: <SuccessPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
