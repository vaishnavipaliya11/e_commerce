import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItemType } from "../../../types/product";

export const updateCart = createAsyncThunk(
  "cart/edit",
  async (payload: CartItemType) => {
    console.log("called postCart", payload);
    try {
      const response = await axios.put(
        `https://651d110444e393af2d591767.mockapi.io/cart/${payload.id}
      `,
        payload
      );
      if (response.status === 200) {
        console.log(response, "postCart");
        const cart = response?.data;
        return cart;
      } else {
        console.error(
          "Failed to retrieve orders. Status Code: ",
          response.status
        );
        return null;
      }
    } catch (error) {
      console.error("Error while fetching orders: ", error);
      return null;
    }
  }
);
