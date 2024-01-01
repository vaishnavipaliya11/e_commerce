import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/product/productSlice";
import CartReducer from "../features/cart/cartSlice";
import WishListReducer from "../features/wishlist/wishListSlice";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    wishlist: WishListReducer,
    product:ProductReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
