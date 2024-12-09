export type TError = {
  status: number;
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
};

export interface IUserData {
  id: string
  name: string
  email: string
  profileImage: string | null;
  contactNumber: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
  shop: any
  followShop: any[]
  reviews: any[]
}

export interface IProduct {
  id: string
  name: string
  price: number
  inventoryCount: number
  isFlashSale: boolean
  discount: number | null;
  flashSalePrice: number | null;
  description: string
  images: string[]
  shopId: string
  createdAt: string
  updatedAt: string
  shop: IShop
  productCategory: IProductCategory[]
}

export interface IShop {
  id: string
  name: string
  vendorId: string
  logoUrl: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface IProductCategory {
  productId: string
  categoryId: string
  category: ICategory
}

export interface ICategory {
  id: string
  name: string
}