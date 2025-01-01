export type TError = {
  status: number;
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
};

export interface IUserData {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  contactNumber: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  shop: any;
  followShop: any[];
  reviews: any[];
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  inventoryCount: number;
  isFlashSale: boolean;
  discount: number | null;
  flashSalePrice: number | null;
  description: string;
  images: string[];
  shopId: string;
  createdAt: string;
  updatedAt: string;
  shop: IShop;
  productCategory: IProductCategory[];
  reviews: IReview[];
}

export interface IShop {
  id: string;
  name: string;
  vendorId: string;
  logoUrl: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  vendor: IUserData;
  products?: IProduct[];
}

export interface IProductCategory {
  productId: string;
  categoryId: string;
  category: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  userId: string;
  transactionId: string;
  paymentDate: string;
  totalPrice: number;
  status: string;
  user: IUserData;
  products: IPaymentProduct[];
}

export interface IPaymentProduct {
  id: string;
  paymentId: string;
  productId: string;
  quantity: number;
  price: number;
  product: IProduct;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  reply: string | null;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user: IUserData;
  product: IProduct;
}

export interface ICoupon {
  id: string;
  couponNumber: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  userCoupon: IUserCoupon[];
}

export interface IUserCoupon {
  couponId: string;
  userId: string;
  status: string;
  coupon: ICoupon;
  user: IUserData;
}
