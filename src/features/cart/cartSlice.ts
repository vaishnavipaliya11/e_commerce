import { createSlice } from "@reduxjs/toolkit";
import {  CartItemType } from "../../types/product";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCart } from "./helpers/getCart";
import { postCart } from "./helpers/postCart";
import { updateCart } from "./helpers/updateCart";

export interface CartState {
  cartItems: CartItemType[];
  cartLoading: boolean;
  itemIdMap: { [itemId: string]: boolean };
}

const initialState: CartState = {
  cartItems: [],
  itemIdMap: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(
        getCart.fulfilled,
        (state, action: PayloadAction<CartItemType[]>) => {
          console.log(action.payload, "payload");

          state.cartItems = action.payload;
          state.cartLoading = false;
        }
      )
      .addCase(getCart.rejected, (state) => {
        state.cartLoading = false;
      });

    builder
      .addCase(postCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(
        postCart.fulfilled,
        (state, action: PayloadAction<CartItemType>) => {
          state.cartItems = [...state.cartItems, action.payload];
          state.cartLoading = false;
        }
      )
      .addCase(postCart.rejected, (state) => {
        state.cartLoading = false;
      });
    builder
      .addCase(updateCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(
        updateCart.fulfilled,
        (state, action: PayloadAction<CartItemType>) => {
          state.cartItems = state.cartItems.map((data) =>
            data.id === action.payload.id ? action.payload : data
          );
          state.cartLoading = false;
        }
      )
      .addCase(updateCart.rejected, (state) => {
        state.cartLoading = false;
      });
  },
});



export default cartSlice.reducer;
