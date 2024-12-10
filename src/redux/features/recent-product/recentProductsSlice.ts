import { IProduct } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecentProductsState {
  products: IProduct[];
}

const initialState: RecentProductsState = {
  products: [],
};

const recentProductsSlice = createSlice({
  name: "recentProducts",
  initialState,
  reducers: {
    addViewedProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter((product) => product !== null && product !== undefined);

      const existingIndex = state.products.findIndex(
        (product) => product?.id === action.payload.id
      );

      if (existingIndex !== -1) {
        state.products.splice(existingIndex, 1);
      }

      state.products.unshift(action.payload);

      if (state.products.length > 10) {
        state.products.pop();
      }
    },
  },
});

export const { addViewedProduct } = recentProductsSlice.actions;
export default recentProductsSlice.reducer;
