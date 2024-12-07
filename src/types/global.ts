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
  profileImage: any
  contactNumber: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
  shop: any
  followShop: any[]
  reviews: any[]
}