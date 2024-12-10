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
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { UserRole } from "@/utils/constants";

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
        element: (
          <ProtectedRoute role={undefined}>
            <ProductDetails />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute role={UserRole.CUSTOMER}>
            <UserOrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-reviews",
        element: (
          <ProtectedRoute role={UserRole.CUSTOMER}>
            <UserReviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role={undefined}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/success",
        element: (
          <ProtectedRoute role={UserRole.CUSTOMER}>
            <SuccessPage />
          </ProtectedRoute>
        ),
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
