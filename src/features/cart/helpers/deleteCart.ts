import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCart = createAsyncThunk("cart/delete", async (id:string) => {
  try {
    const response = await axios.delete(`https://651d110444e393af2d591767.mockapi.io/cart/${id}`);
    console.log(response, "deletecart");
    if (response.status === 200) {
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
});