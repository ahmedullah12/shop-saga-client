import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register/Register";
import Login from "@/pages/Login/Login";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import SuccessPage from "@/pages/SuccessPage/SuccessPage";
import RecentViewedProducts from "@/pages/Customer/RecentViewedProducts/RecentViewedProducts";
import AllProducts from "@/pages/Home/AllProducts";
import UserOrderHistory from "@/pages/Customer/UserOrderHistory/UserOrderHistory";
import UserReviews from "@/pages/Customer/UserReviews/UserReviews";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { UserRole } from "@/utils/constants";
import FlashSaleProducts from "@/pages/FlashSaleProducts/FlashSaleProducts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Shop from "@/pages/Vendor/Shop/Shop";
import AddProduct from "@/pages/Vendor/AddProduct/AddProduct";
import VendorAllProducts from "@/pages/Vendor/VendorAllProducts/VendorAllProducts";
import UpdateProduct from "@/pages/Vendor/UpdateProduct/UpdateProduct";
import ShopProductsReviews from "@/pages/Vendor/Reviews/ShopProductsReviews";
import ShopOrderHistory from "@/pages/Vendor/ShopOrderHistory/ShopOrderHistory";

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
        path: "/flash-sale-products",
        element: <FlashSaleProducts />,
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/vendor/shop",
        element: <Shop />,
      },
      {
        path: "/dashboard/vendor/products",
        element: <VendorAllProducts />,
      },
      {
        path: "/dashboard/vendor/products-reviews",
        element: <ShopProductsReviews />,
      },
      {
        path: "/dashboard/vendor/shop-orders",
        element: <ShopOrderHistory />,
      },
      {
        path: "/dashboard/vendor/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/vendor/update-product/:id",
        element: <UpdateProduct />,
      },
    ],
  },
]);

export default router;
