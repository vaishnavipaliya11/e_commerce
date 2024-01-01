import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/product";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WishListState {
  wishListItems: ProductType[];
  itemIdMap: { [itemId: string]: boolean };
}

const initialState: WishListState = {
  wishListItems: [],
  itemIdMap: {},
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishListItem: (state, action: PayloadAction<ProductType>) => {
      const id = action.payload.id;
      const isPresent = state.wishListItems.find(item => item.id === id);
      if (isPresent) {
        state.itemIdMap[id] = false;
        state.wishListItems = state.wishListItems.filter(item => item.id !== id);
      } else {
        state.itemIdMap[id] = true;
        state.wishListItems.push({ ...action.payload });
      }
    },
  },
});

export const { toggleWishListItem } = wishListSlice.actions;

export default wishListSlice.reducer;
