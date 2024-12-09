import { IProduct } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = IProduct & {
  addedProductQuantity: number;
};

type TInitialState = {
  cart: CartItem[];
  totalPrice: number;
  warning: string | null;
  pendingProduct: IProduct | null;
};

const initialState: TInitialState = {
  cart: [],
  totalPrice: 0,
  warning: null,
  pendingProduct: null,
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
        state.pendingProduct = action.payload; // Track the product causing the warning
        return;
      }

      const priceToUse =
        action.payload.isFlashSale && action.payload.flashSalePrice
          ? action.payload.flashSalePrice
          : action.payload.price;

      // Add product logic (unchanged)
      if (!selectedProduct) {
        const product = { ...action.payload, addedProductQuantity: 1 };
        product.inventoryCount -= 1;
        state.cart.push(product);
        state.totalPrice += priceToUse;
      } else {
        selectedProduct.addedProductQuantity += 1;
        selectedProduct.inventoryCount -= 1;
        state.totalPrice += priceToUse;
      }

      state.warning = null;
      state.pendingProduct = null;
    },
    replaceCartWithNewProduct: (state) => {
      if (state.pendingProduct) {
        state.cart.forEach(
          (item) => (item.inventoryCount += item.addedProductQuantity)
        );
        state.cart = [];
        state.totalPrice = 0;

        const product = { ...state.pendingProduct, addedProductQuantity: 1 };
        product.inventoryCount -= 1;
        state.cart.push(product);
        state.totalPrice += product.price;
      }

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
        product.addedProductQuantity += 1;
        product.inventoryCount -= 1;
        state.totalPrice += product.price; // Update total price
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product && product.addedProductQuantity > 1) {
        product.addedProductQuantity -= 1;
        product.inventoryCount += 1;
        state.totalPrice -= product.price; // Update total price
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        product.inventoryCount += product.addedProductQuantity;
        state.totalPrice -= product.price * product.addedProductQuantity;
        state.cart = state.cart.filter((item) => item.id !== productId);
      }
    },
    clearCart: (state) => {
      state.cart.forEach(
        (item) => (item.inventoryCount += item.addedProductQuantity)
      );

      state.cart = [];
      state.totalPrice = 0;
      state.warning = null;
      state.pendingProduct = null;
    },
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
} = cartSlice.actions;
export default cartSlice.reducer;
