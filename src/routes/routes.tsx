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
import AllProducts from "@/pages/Products/AllProducts";
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
import ShopPage from "@/pages/Shop/ShopPage";
import ForgetPassword from "@/pages/ForgetPassword/ForgetPassword";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import AllUsers from "@/pages/Admin/AllUsers/AllUsers";
import OrderHistory from "@/pages/Admin/OrderHistory/OrderHistory";
import Categories from "@/pages/Admin/Categories/Categories";
import AllShops from "@/pages/Admin/AllShops/AllShops";
import Shops from "@/pages/Shops/Shops";
import ErrorPage from "@/pages/Error/Error";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Profile from "@/pages/Profile/Profile";
import Coupons from "@/pages/Admin/Coupons/Coupons";
import SubscribedUsers from "@/pages/Admin/SubscribedUsers/SubscribedUsers";
import VendorDashbaord from "@/pages/Vendor/VendorDashbaord/VendorDashbaord";
import AdminDashboard from "@/pages/Admin/AdminDashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/shops",
        element: <Shops />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
        path: "/profile",
        element: (
          <ProtectedRoute role={undefined}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shop/:id",
        element: <ShopPage />,
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
          <ProtectedRoute role={UserRole.CUSTOMER}>
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
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/vendor/dashboard",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <VendorDashbaord />
          </ProtectedRoute>
        )
      },
      {
        path: "/dashboard/vendor/shop",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <Shop />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/vendor/products",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <VendorAllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/vendor/products-reviews",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <ShopProductsReviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/vendor/shop-orders",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <ShopOrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/vendor/add-product",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/vendor/update-product/:id",
        element: (
          <ProtectedRoute role={UserRole.VENDOR}>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/dashboard",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/all-users",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <AllUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/orders-history",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/products-categories",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/shops",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <AllShops />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/subscribed-users",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <SubscribedUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/coupons",
        element: (
          <ProtectedRoute role={UserRole.ADMIN}>
            <Coupons />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
