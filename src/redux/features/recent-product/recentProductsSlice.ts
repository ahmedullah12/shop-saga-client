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
      // Ensure products array is valid
      state.products = state.products.filter((product) => product !== null && product !== undefined);

      // Find if the product already exists in the list
      const existingIndex = state.products.findIndex(
        (product) => product?.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Remove the existing product if found
        state.products.splice(existingIndex, 1);
      }

      // Add the new product to the start of the array
      state.products.unshift(action.payload);

      // Ensure the array doesn't exceed 10 items
      if (state.products.length > 10) {
        state.products.pop();
      }
    },
  },
});

export const { addViewedProduct } = recentProductsSlice.actions;
export default recentProductsSlice.reducer;
