import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/product";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "./helpers/getProducts";

export interface ProductState {
  allProducts: ProductType[];
  productLoading:boolean
}

const initialState: ProductState = {
  allProducts: [],
  productLoading:false
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(getProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.allProducts = action.payload;
        state.productLoading = false;
      })
      
      .addCase(getProducts.rejected, (state) => {
        state.productLoading = false;
      });
  }
});


export default productSlice.reducer;
