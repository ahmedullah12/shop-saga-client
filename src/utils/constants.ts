export const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  VENDOR: "VENDOR",
} as const;

export const vendorSideBarOptions = [
  {
    title: "Shop",
    route: "shop",
  },
  {
    title: "Products",
    route: "products",
  },
  {
    title: "Reviews & Ratings",
    route: "products-reviews",
  },
  {
    title: "Order History",
    route: "shop-orders",
  },
];

export const adminSideBarOptions = [
  {
    title: "Users",
    route: "users",
  },
  {
    title: "Shops",
    route: "shops",
  },
  {
    title: "Products Categories",
    route: "products-categories",
  },
  {
    title: "Orders History",
    route: "orders-history",
  },
];
