import { ICoupon, IProduct } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = IProduct & {
  addedProductQuantity: number;
};

type TInitialState = {
  cart: CartItem[];
  totalPrice: number;
  warning: string | null;
  pendingProduct: IProduct | null;
  appliedCoupon: ICoupon | null;
  discountedTotal: number;
};

const initialState: TInitialState = {
  cart: [],
  totalPrice: 0,
  warning: null,
  pendingProduct: null,
  appliedCoupon: null,
  discountedTotal: 0,
};

const recalculateTotalPrice = (cart: CartItem[]) =>
  cart.reduce((total, item) => {
    const priceToUse =
      item.isFlashSale && item.flashSalePrice
        ? item.flashSalePrice
        : item.price;
    return total + priceToUse * item.addedProductQuantity;
  }, 0);

const calculateDiscountedTotal = (totalPrice: number, coupon: ICoupon | null) => {
  if (!coupon) return totalPrice;
  const discount = (totalPrice * coupon.discount) / 100;
  return totalPrice - discount;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const selectedProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (
        state.cart.length > 0 &&
        state.cart[0].shopId !== action.payload.shopId
      ) {
        state.warning = "Adding products from different vendors. Replace cart?";
        state.pendingProduct = action.payload;
        return;
      }

      if (!selectedProduct) {
        const product = { ...action.payload, addedProductQuantity: 1 };
        product.inventoryCount -= 1;
        state.cart.push(product);
      } else {
        selectedProduct.addedProductQuantity += 1;
        selectedProduct.inventoryCount -= 1;
      }

      state.totalPrice = recalculateTotalPrice(state.cart);
      state.discountedTotal = calculateDiscountedTotal(state.totalPrice, state.appliedCoupon);
      state.warning = null;
      state.pendingProduct = null;
    },

    replaceCartWithNewProduct: (state) => {
      if (state.pendingProduct) {
        state.cart.forEach(
          (item) => (item.inventoryCount += item.addedProductQuantity)
        );
        state.cart = [];

        const product = { ...state.pendingProduct, addedProductQuantity: 1 };
        product.inventoryCount -= 1;
        state.cart.push(product);
      }

      state.totalPrice = recalculateTotalPrice(state.cart);
      state.discountedTotal = calculateDiscountedTotal(state.totalPrice, state.appliedCoupon);
      state.warning = null;
      state.pendingProduct = null;
    },

    retainCurrentCart: (state) => {
      state.warning = null;
      state.pendingProduct = null;
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product && product.inventoryCount > 0) {
        const priceToUse =
          product.isFlashSale && product.flashSalePrice
            ? product.flashSalePrice
            : product.price;
        product.addedProductQuantity += 1;
        product.inventoryCount -= 1;
        state.totalPrice += priceToUse;
        state.discountedTotal = calculateDiscountedTotal(state.totalPrice, state.appliedCoupon);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product && product.addedProductQuantity > 1) {
        const priceToUse =
          product.isFlashSale && product.flashSalePrice
            ? product.flashSalePrice
            : product.price;
        product.addedProductQuantity -= 1;
        product.inventoryCount += 1;
        state.totalPrice -= priceToUse;
        state.discountedTotal = calculateDiscountedTotal(state.totalPrice, state.appliedCoupon);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        const priceToUse =
          product.isFlashSale && product.flashSalePrice
            ? product.flashSalePrice
            : product.price;
        product.inventoryCount += product.addedProductQuantity;
        state.totalPrice -= priceToUse * product.addedProductQuantity;
        state.cart = state.cart.filter((item) => item.id !== productId);
      }
      if (state.totalPrice < 0) {
        state.totalPrice = 0;
      }
      state.discountedTotal = calculateDiscountedTotal(state.totalPrice, state.appliedCoupon);
    },

    clearCart: (state) => {
      state.cart.forEach(
        (item) => (item.inventoryCount += item.addedProductQuantity)
      );

      state.cart = [];
      state.totalPrice = 0;
      state.discountedTotal = 0;
      state.warning = null;
      state.pendingProduct = null;
      state.appliedCoupon = null;
    },

    applyCoupon: (state, action: PayloadAction<ICoupon>) => {
      state.appliedCoupon = action.payload;
      state.discountedTotal = calculateDiscountedTotal(state.totalPrice, action.payload);
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountedTotal = state.totalPrice;
    }
  },
});

export const {
  addToCart,
  replaceCartWithNewProduct,
  retainCurrentCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  applyCoupon,
  removeCoupon
} = cartSlice.actions;

export default cartSlice.reducer;