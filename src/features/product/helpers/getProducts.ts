import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/get", async () => {
    try {
      const response = await axios.get("https://651d110444e393af2d591767.mockapi.io/products");
      console.log(response, "response");
      if (response.status === 200) {
        const product = response?.data;
        return product;
      } else {
        console.error(
          "Failed to retrieve orders. Status Code: ",
          response.status
        );
        return null;
      }
    } catch (error:any) {
      console.error("Error while fetching orders: ", error.message);
      return null;
    }
  });