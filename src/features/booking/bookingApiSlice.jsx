import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// make payment
export const makePayment = createAsyncThunk(
  "booking/makePayment",
  async ({ amount, token }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/booking/make-payment`,
        { amount, token },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// book seat
export const bookSeats = createAsyncThunk(
  "booking/bookSeat",
  async (payload) => {
    try {
      const response = await axios
        .post(`${baseUrl}/booking/book-show`, payload, {
          withCredentials: true,
        })
        

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
